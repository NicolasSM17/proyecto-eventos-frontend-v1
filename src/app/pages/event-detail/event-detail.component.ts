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
  esCreador: boolean = false; // Bandera para saber si es el creador
  eventosSimilares: Evento[] = [];

  constructor(private activatedRoute: ActivatedRoute, private eventoService: EventService,
              private imageProcessingService: ImageProcessingService) { }

  ngOnInit(): void {
    // Combina paramMap y queryParamMap en una sola suscripción
    this.activatedRoute.paramMap.subscribe(params => {
      this.eventoId = +params.get("eventoId");
      this.activatedRoute.queryParamMap.subscribe(queryParams => {
        this.institucionId = +queryParams.get("institucionId");
        
        // Asegúrate de que ambos IDs estén definidos antes de proceder
        if (this.eventoId && this.institucionId) {
          this.loadData();
        } else {
          console.error('eventoId o institucionId no definidos');
        }
      });
    });
  
    // Optionally, you can add animation logic here on component initialization
    const eventoInfo = document.querySelector('.evento-info');
    eventoInfo?.classList.add('visible');

    
  }
  
  loadData(): void {
    this.getEventoInfo();
    this.getEventosSimilares();
  }

  getEventoInfo(){
    this.eventoService.getByIdEvento(this.eventoId).pipe(
      map(
        (evento: Evento) => {
          const [hours, minutes] = evento.hora.split(':');
          evento.horaDate = new Date(0, 0, 0, +hours, +minutes);

          // Verificar si el usuario logueado es el creador del evento
          const user = JSON.parse(localStorage.getItem('user'));
          this.esCreador = user.id && +user.id === evento.organizador.id;

          return this.imageProcessingService.createImages(evento);
        }
        
      )
    ).subscribe(
      (response: Evento) => {
        this.evento = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  getEventosSimilares(){
    this.eventoService.getEventosConCategoriasSimilares(this.eventoId, this.institucionId).pipe(
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
        this.eventosSimilares = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  copiarCodigo(codigo: string): void {
    navigator.clipboard.writeText(codigo).then(
      () => alert('¡Código copiado al portapapeles!'),
      (error) => console.error('Error al copiar el código:', error)
    );
  }
}