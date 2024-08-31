import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Evento } from 'src/app/model/event.model';
import { EventService } from 'src/app/services/event.service';
import { ImageProcessingService } from 'src/app/services/image-processing.service';

@Component({
  selector: 'app-edit-my-event',
  templateUrl: './edit-my-event.component.html',
  styleUrls: ['./edit-my-event.component.css']
})
export class EditMyEventComponent implements OnInit{
  evento: Evento;
  eventoId: number;
  seccionSeleccionada: string = 'asistentes';
  asistentes = [
    { codigoTicket: 'TK001', nombreCompleto: 'Juan Pérez', dni: '12345678' },
    { codigoTicket: 'TK002', nombreCompleto: 'María García', dni: '87654321' },
    { codigoTicket: 'TK001', nombreCompleto: 'Juan Pérez', dni: '12345678' },
    { codigoTicket: 'TK002', nombreCompleto: 'María García', dni: '87654321' },
    { codigoTicket: 'TK001', nombreCompleto: 'Juan Pérez', dni: '12345678' },
    { codigoTicket: 'TK002', nombreCompleto: 'María García', dni: '87654321' },
    { codigoTicket: 'TK001', nombreCompleto: 'Juan Pérez', dni: '12345678' },
    { codigoTicket: 'TK002', nombreCompleto: 'María García', dni: '87654321' },
    { codigoTicket: 'TK001', nombreCompleto: 'Juan Pérez', dni: '12345678' },
    { codigoTicket: 'TK002', nombreCompleto: 'María García', dni: '87654321' },
    { codigoTicket: 'TK001', nombreCompleto: 'Juan Pérez', dni: '12345678' },
    { codigoTicket: 'TK002', nombreCompleto: 'María García', dni: '87654321' },
    { codigoTicket: 'TK001', nombreCompleto: 'Juan Pérez', dni: '12345678' },
    { codigoTicket: 'TK002', nombreCompleto: 'María García', dni: '87654321' },
    // Agrega más asistentes según lo necesites
  ];

  constructor(private activatedRoute: ActivatedRoute, private eventoService: EventService,
              private imageProcessingService: ImageProcessingService){}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      params => {
        this.eventoId = +params.get("eventoId");
        this.getEventoInfo();
      }
    );
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

  seleccionarSeccion(seccion: string) {
    this.seccionSeleccionada = seccion;
  }

  guardarCambios() {
    // Aquí puedes implementar la lógica para guardar los cambios
    console.log('Cambios guardados', this.evento);
    this.seccionSeleccionada = null;
  }

  exportarAExcel(){
    
  }

  eliminarEvento(){

  }
}
