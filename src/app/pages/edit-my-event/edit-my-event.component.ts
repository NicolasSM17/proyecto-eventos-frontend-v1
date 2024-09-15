import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Evento } from 'src/app/model/event.model';
import { EventService } from 'src/app/services/event.service';
import { ImageProcessingService } from 'src/app/services/image-processing.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-edit-my-event',
  templateUrl: './edit-my-event.component.html',
  styleUrls: ['./edit-my-event.component.css']
})
export class EditMyEventComponent implements OnInit{
  evento: Evento;
  eventoId: number;
  editEventForm: FormGroup;
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
              private imageProcessingService: ImageProcessingService, private router: Router,
              private userAuthService: UserAuthService, private fb: FormBuilder){}

  ngOnInit(): void {
    // Inicializamos el formulario reactivo
    this.editEventForm = this.fb.group({
      titulo: [''],
      descripcion: [''],
      fecha: [''],
      hora: [''],
      direccion: [''],
      direccionUrl: [''],
      precioEntrada: ['']
    });

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
      (evento: Evento) => {
        this.evento = evento;
        this.editEventForm.patchValue({
          titulo: evento.titulo || '',
          descripcion: evento.descripcion || '',
          fecha: evento.fecha || '',
          hora: evento.hora || '',
          direccion: evento.direccion || '',
          direccionUrl: evento.direccionUrl || '',
          precioEntrada: evento.precioEntrada || null
        });
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  seleccionarSeccion(seccion: string) {
    this.seccionSeleccionada = seccion;
  }

  updateEvento(eventoId: number, evento: Evento) {
    // Convierte el campo horaDate a una cadena en formato HH:mm
    if (evento.horaDate) {
      const horas = evento.horaDate.getHours().toString().padStart(2, '0');
      const minutos = evento.horaDate.getMinutes().toString().padStart(2, '0');
      evento.hora = `${horas}:${minutos}`; // Actualiza el campo hora con el formato HH:mm
    }

    this.eventoService.update(eventoId, evento).subscribe(
      (response: Evento) => {
        console.log(response);
        console.log("Se ha actualizado el evento");
        this.getEventoInfo();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  exportarAExcel(){
    
  }

  deleteEvento(eventoId){
    const organizadorId = this.userAuthService.getUserId(); 

    this.eventoService.delete(eventoId).subscribe(
      (response) => {
        this.router.navigate(['/myEvents'], { queryParams: { organizadorId } });
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  onSubmit(): void {
    if (this.editEventForm.valid) {
      const updatedEvent = this.editEventForm.value;
      
      this.eventoService.update(this.eventoId, updatedEvent).subscribe(
        response => {
          console.log('Evento actualizado con éxito');
          console.log(response);
        },
        error => {
          console.error('Error al actualizar el evento', error);
        }
      );
    }
  }
}
