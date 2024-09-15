import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Evento } from 'src/app/model/event.model';
import { EventService } from 'src/app/services/event.service';
import { ImageProcessingService } from 'src/app/services/image-processing.service';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit{
  organizadorId: number;
  eventos: Evento[] = [];

  constructor(private activatedRoute: ActivatedRoute, private eventoService: EventService,
              private imageProcessingService: ImageProcessingService){}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.organizadorId = +params['organizadorId'];
        this.getEventosDelOrganizador();
      }
    );
  }

  getEventosDelOrganizador(){
    this.eventoService.getEventoByIdOrganizador(this.organizadorId).pipe(
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
