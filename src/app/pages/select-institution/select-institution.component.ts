import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { Institution } from 'src/app/model/institution.model';
import { InstitutionService } from 'src/app/services/institution.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

declare var $: any;

@Component({
  selector: 'app-select-institution',
  templateUrl: './select-institution.component.html',
  styleUrls: ['./select-institution.component.css']
})
export class SelectInstitutionComponent implements OnInit  {
  institutions: Institution[] = [];
  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: true,
    dots: false,
    speed: 400, 
    cssEase: 'linear', 
    adaptiveHeight: true, 
    responsive : [

      {
        breakpoint : 1292,
        settings : {
          arrows: true,
          infinite: true,
          dots: false,
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint : 992,
        settings : {
          arrows: true,
          infinite: true,
          dots: false,
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint : 662,
        settings : {
          arrows: true,
          infinite: true,
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  private isDragging = false;
  private startX: number = 0;
  private scrollThreshold = 5;
  

  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;

  constructor(
    private userAuthService: UserAuthService, 
    private institutionService: InstitutionService,
    private router: Router,
    private cdRef: ChangeDetectorRef
    
  ) {}

  ngOnInit(): void {
    this.getInstituciones();
  }

 
  
  onMouseDown(event: MouseEvent) {
    this.isDragging = false;
    this.startX = event.clientX;
  }

  onMouseMove(event: MouseEvent) {
    if (Math.abs(event.clientX - this.startX) > this.scrollThreshold) {
      this.isDragging = true;
    }
  }

  


  onMouseLeave() {
    this.isDragging = false;
    console.log('Mouse leave');
  }

  handleClick(event: MouseEvent, institution: Institution) {
    // Si está arrastrando, no realizar ninguna acción
    if (this.isDragging) {
      event.preventDefault();
      return;
    }
  
    // Navegar solo si no está arrastrando
    this.router.navigate(['/eventList', institution.id]);
  }
  

  getInstituciones() {
    this.institutionService.getInstitution().subscribe(
      (response: Institution[]) => {
        this.institutions = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  isAdmin() {
    return this.userAuthService.isAdmin();
  }

  slickInit(e) {
    this.slickModal.slickGoTo(0); 
    console.log('slick initialized');
  }
  
  breakpoint(e) {
    console.log('breakpoint');
  }
  
  afterChange(e) {
  console.log('afterChange', e.currentSlide);
}

beforeChange(e) {
  console.log('beforeChange', e.currentSlide);
}

  
}
