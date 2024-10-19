import { Component } from '@angular/core';
import { Evento } from 'src/app/model/event.model';
import { EventService } from 'src/app/services/event.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-code-verification',
  templateUrl: './code-verification.component.html',
  styleUrls: ['./code-verification.component.css']
})
export class CodeVerificationComponent {
  codigoEvento: string; // Código ingresado por el usuario
  evento: Evento; // Para almacenar los detalles del evento

  constructor(private eventoService: EventService){}

  // Método para verificar el código
  verification() {
    if (!this.codigoEvento || this.codigoEvento.length !== 8) {
      Swal.fire({
        text: 'Por favor ingresa un código válido de 8 caracteres',
        icon: 'warning'
      });
      return;
    }

    this.eventoService.getEventoByCodigoAutogenerado(this.codigoEvento).subscribe(
      (evento: Evento) => {
        this.evento = evento;
        this.showEventDetailsModal(); // Mostrar los detalles del evento en un modal
      },
      (error) => {
        console.error('Error al buscar el evento:', error);
        Swal.fire({
          text: 'No se encontró ningún evento con este código.',
          icon: 'error'
        });
      }
    );
  }

  // Método para mostrar el modal con los detalles del evento
  showEventDetailsModal() {
    Swal.fire({
      title: `<p><b>Titulo del evento:</b><br> <strong>${this.evento?.titulo}</strong> </p>`,
      html: `
        <p>¡Este codigo es valido y pertenece a un evento!</p>
        <p><b>Hora:</b> ${this.evento?.hora}</p>
        <p><b>Dirección:</b> ${this.evento?.direccion}</p>
        <p><b>Organizador:</b> ${this.evento?.organizador.nombre} ${this.evento?.organizador.apellido}</p>
      `,
      icon: 'success'
    });
  }
}
