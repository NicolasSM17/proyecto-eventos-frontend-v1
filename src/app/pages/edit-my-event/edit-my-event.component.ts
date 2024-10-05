import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Evento } from 'src/app/model/event.model';
import { EventService } from 'src/app/services/event.service';
import { ImageProcessingService } from 'src/app/services/image-processing.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

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
  fileName = "ExcelSheet.xlsx";
  asistentes = [];

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
        this.asistentes = evento.asistentes || [];  // Llenar el array de asistentes con los datos del evento
        console.log(evento);
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

  exportarAExcel(){
    let data = document.getElementById("table-data");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.fileName);
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
          Swal.fire({
            text: "Evento actualizado con exito",
            icon: "success"
          });
        },
        error => {
          Swal.fire({
            text: "Error al actualizar el evento",
            icon: "error"
          });
          console.error('Error al actualizar el evento', error);
        }
      );
    }
  }
}
