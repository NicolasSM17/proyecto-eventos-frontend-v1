import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Evento } from 'src/app/model/event.model';
import { EventService } from 'src/app/services/event.service';
import { ImageProcessingService } from 'src/app/services/image-processing.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit{
  evento: Evento;
  eventoId: number;
  institucionId: number;

  eventosSimilares = [
    {
      nombre: 'Nombre del Evento Similar 1',
      fecha: '5 de mayo de 2024',
      imagen: 'https://via.placeholder.com/800x300?text=Evento+1',
      url: 'url-a-tu-evento-similar',
      precio: 'XX.XX'
    },
    {
      nombre: 'Nombre del Evento Similar 2',
      fecha: '6 de mayo de 2024',
      imagen: 'https://via.placeholder.com/800x300?text=Evento+2',
      url: 'url-a-tu-evento-similar',
      precio: 'XX.XX'
    },
    {
      nombre: 'Nombre del Evento Similar 3',
      fecha: '7 de mayo de 2024',
      imagen: 'https://via.placeholder.com/800x300?text=Evento+3',
      url: 'url-a-tu-evento-similar',
      precio: 'XX.XX'
    }
  ];

  constructor(private activatedRoute: ActivatedRoute, private eventoService: EventService,
              private imageProcessingService: ImageProcessingService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      params => {
        this.eventoId = +params.get("eventoId");
        this.getEventoInfo();
      }
    );

    this.activatedRoute.queryParamMap.subscribe(
      params => {
        this.institucionId = +params.get("institucionId");
      }
    );

    // Optionally, you can add animation logic here on component initialization
    const eventoInfo = document.querySelector('.evento-info');
    eventoInfo?.classList.add('visible');
  }

  getEventoInfo(){
    this.eventoService.getByIdEvento(this.eventoId).pipe(
      map(
        (evento: Evento) => {
          const [hours, minutes] = evento.hora.split(':');
          evento.horaDate = new Date(0, 0, 0, +hours, +minutes);

          return this.imageProcessingService.createImages(evento);
        }
        
      )
    ).subscribe(
      (response: Evento) => {
        this.evento = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
