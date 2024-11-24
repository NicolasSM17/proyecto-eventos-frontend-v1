import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Evento } from 'src/app/model/event.model';
import { EventService } from 'src/app/services/event.service';
import { ImageProcessingService } from 'src/app/services/image-processing.service';
declare var $: any; // Importa jQuery si estás usando Bootstrap 4

interface Novedad {
  id: number;
  titulo: string;
  imagen: string;
  url: string;
}

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit, AfterViewInit {
  @ViewChild('carousel') carousel!: ElementRef;
  @ViewChild('swiper') swiper!: ElementRef;

  eventos: Evento[] = [];
  institucionId: number;
  novedades: Novedad[] = [];

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

    this.novedades = [
      {
        id: 1,
        titulo: 'Nuevo evento cultural',
       imagen: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/dark-blue-dj-music-festival-banner-design-template-e42efaf29a52b8300ec375e7be631292_screen.jpg?ts=1599558497',
        url: '/novedad1'
      },
      {
        id: 2,
        titulo: 'Festival de música',
        imagen: 'https://img.freepik.com/psd-gratis/plantilla-banner-festival-musica-rock_23-2148971252.jpg',
        url: '/novedad1'
      },
      {
        id: 3,
        titulo: 'Nuevo evento cultural',
       imagen:'https://st4.depositphotos.com/7555982/20984/v/1600/depositphotos_209842000-stock-illustration-vector-illustration-banner-design-template.jpg',
        url: '/novedad1'
      },
      {
        id: 4,
        titulo: 'Nuevo evento cultural',
       imagen:  'https://c8.alamy.com/comp/2RF5886/3d-music-event-banner-vector-2RF5886.jpg',
        url: '/novedad1'
      },
      {
        id: 5,
        titulo: 'Nuevo evento cultural',
       imagen: 'https://i.pinimg.com/736x/4b/92/43/4b924325613089a96886f1f64ce6d657.jpg',
        url: '/novedad1'
      },
      {
        id: 6,
        titulo: 'Nuevo evento cultural',
       imagen: 'https://previews.123rf.com/images/singpentinkhappy/singpentinkhappy2009/singpentinkhappy200906864/155230088-plantilla-de-dise%C3%B1o-de-dise%C3%B1o-de-banner-de-festival-de-m%C3%BAsica-electr%C3%B3nica-de-verano-de-vector-para.jpg',
        url: '/novedad1'
      },
      // ... más novedades
    ];
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
