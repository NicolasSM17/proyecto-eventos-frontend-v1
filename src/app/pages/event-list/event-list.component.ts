import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Evento } from 'src/app/model/event.model';
import { EventService } from 'src/app/services/event.service';
import { ImageProcessingService } from 'src/app/services/image-processing.service';
declare var $: any; // Importa jQuery si estás usando Bootstrap 4

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit, AfterViewInit {
  @ViewChild('carousel') carousel!: ElementRef;
  eventos: Evento[] = [];
  institucionId: number;

  slides = [
    { image: 'https://cdn.joinnus.com/files/2024/06/LfBSShMvDGCvLLd.png' },
    { image: 'https://cdn.joinnus.com/files/2024/06/p0B3pUzwtDumLcQ.png' },
    { image: 'https://cdn.joinnus.com/files/2024/05/5ez52ZUqddX2U5s.png' }
  ];

  constructor(private activatedRoute: ActivatedRoute, private eventoService: EventService,
              private imageProcessingService: ImageProcessingService){}

  ngOnInit(): void {
    this.addLoadedClassToMain();
    this.addPressEffectToButtons();
    
    this.activatedRoute.paramMap.subscribe(
      params => {
        this.institucionId = +params.get("institucionId");
        this.getEventos();
      }
    );
  }

  ngAfterViewInit() {
      this.initializeSlickCarousel();
  }

  initializeSlickCarousel() {
    $(this.carousel.nativeElement).slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 5000,
      cssEase: 'linear',
      adaptiveHeight: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  }

  addLoadedClassToMain() {
    const main = document.querySelector('main');
    if (main) {
      main.classList.add('loaded');
    }
  }

  addPressEffectToButtons() {
    const buyButtons = document.querySelectorAll('.btn-comprar');
    buyButtons.forEach(button => {
      button.addEventListener('mousedown', () => {
        button.classList.add('pressed');
      });

      button.addEventListener('mouseup', () => {
        button.classList.remove('pressed');
      });

      button.addEventListener('mouseleave', () => {
        button.classList.remove('pressed');
      });
    });
  }

  preventImageDrag() {
    if (this.carousel && this.carousel.nativeElement) {
      const images = this.carousel.nativeElement.querySelectorAll('img');
      images.forEach((img: HTMLImageElement) => {
        img.addEventListener('dragstart', (e) => e.preventDefault());
      });
    }
  }

  getEventos(){
    this.eventoService.getEventosByIdInstitucion(this.institucionId).pipe(
      map(
        (x: Evento[], i) => x.map(
          (evento: Evento) => {
            const [hours, minutes] = evento.hora.split(':');
            evento.horaDate = new Date(0, 0, 0, +hours, +minutes);
            return this.imageProcessingService.createImages(evento);
          }
        )
      )
    ).subscribe(
      (response: Evento[]) => {
        this.eventos = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
