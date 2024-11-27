import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { BoostRequest } from 'src/app/model/boost-request.model';
import { EstadoBoost } from 'src/app/model/estado-boost.enum';
import { Evento } from 'src/app/model/event.model';
import { User } from 'src/app/model/user.model';
import { BoostService } from 'src/app/services/boost.service';
import { EventService } from 'src/app/services/event.service';
import { ImageProcessingService } from 'src/app/services/image-processing.service';
declare var bootstrap: any;

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit{
  organizadorId: number;
  eventoSeleccionado: Evento;
  selectedFile: File;
  eventos: Evento[] = [];
  paso: number = 1;

  constructor(private activatedRoute: ActivatedRoute, private eventoService: EventService,
              private imageProcessingService: ImageProcessingService, private boostService: BoostService){}

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

  abrirModal(evento: Evento) {
    this.eventoSeleccionado = evento; // Guardamos el evento seleccionado
    const modal = new bootstrap.Modal(document.getElementById('promoteModal')!); // Inicializamos el modal
    modal.show(); // Mostramos el modal
  }

  cambiarPaso(paso: number) {
    this.paso = paso;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Almacena el archivo seleccionado

      console.log('Archivo seleccionado:', this.selectedFile);
    }
  }

  enviarPago(): void {

    if (!this.selectedFile) {
      console.error('Debe seleccionar un archivo.');
      return;
    }

    //const user = JSON.parse(localStorage.getItem('user'));
    const boostRequest: BoostRequest = {
      evento: this.eventoSeleccionado,
      //organizador: { id: this.organizadorId } as User, // Solo necesitas el ID del organizador.
      //organizador: this.eventoSeleccionado.organizador,
      fechaSolicitud: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'), // Formato de fecha ISO.
      estado: EstadoBoost.PENDIENTE, // Estado inicial 'pendiente'.
      monto: 100.0 // El monto fijo o basado en tu lógica.
    };

    this.boostService.generarPeticionDeBoost(boostRequest, this.selectedFile).subscribe(
      (response: BoostRequest) =>{
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
