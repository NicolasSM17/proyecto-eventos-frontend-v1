import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Evento } from 'src/app/model/event.model';
import { TicketRequest } from 'src/app/model/ticket-request.model';
import { EventService } from 'src/app/services/event.service';
import { ImageProcessingService } from 'src/app/services/image-processing.service';
import { TicketService } from 'src/app/services/ticket.service';

// Importar Bootstrap Modal para manejar el cierre
declare var bootstrap: any;

@Component({
  selector: 'app-event-buys',
  templateUrl: './event-buys.component.html',
  styleUrls: ['./event-buys.component.css']
})
export class EventBuysComponent implements OnInit {
  step: number = 1;
  evento: Evento; // Aquí se guardarán los detalles del evento
  eventoId: number; // ID del evento que se obtiene desde el queryParam
  selectedMethod: string = 'yape';
  termsAccepted: boolean = false; // Checkbox for terms acceptance
  quantity: number = 1; // Default quantity
  countdown: string = '00:10:00';
  totalTime: number = 600; // 10 minutes in seconds
  timeLeft: number = this.totalTime;
  progressPercentage: number = 100;
  intervalId: any; // Guardará el intervalo del contador
  cancelled: boolean = false; // Para mostrar el mensaje de compra cancelada
  isPaymentModalOpen: boolean = false;
  formData = {
    name: '',
    email: '',
    phone: '',
    dni: ''
  };
  orderSummary = {
    item: 'Entrada General',
    quantity: 1,
    price: 30.00,
    currency: 'PEN'
  };
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute, 
              private eventoService: EventService, private imageProcessingService: ImageProcessingService,
              private ticketService: TicketService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.eventoId = +params['eventoId'];
        this.getEventoInfo();
      }
    );

    this.startTimer();

    // Simula el proceso de autocompletar los datos del usuario logueado
    this.autocompletarDatosUsuario();
  }

  setSelectedMethod(method: string) {
    this.selectedMethod = method;
  }

  handleInputChange(event: any) {
    const { name, value } = event.target;
    this.formData = { ...this.formData, [name]: value };
  }

  startTimer() {
    const interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.updateCountdown();
        this.updateProgressBar();
      } else {
        clearInterval(interval);
        this.router.navigate(['/']); // Redirige a otro componente cuando el tiempo llegue a 0
      }
    }, 2000);
  }

  updateCountdown() {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    this.countdown = `${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  pad(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  updateProgressBar() {
    this.progressPercentage = (this.timeLeft / this.totalTime) * 100;
  }

  increaseQuantity() {
    this.quantity += 1;
    this.updateTotal();
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity -= 1;
      this.updateTotal();
    }
  }

  updateTotal() {
    this.orderSummary.price = this.evento.precioEntrada * this.quantity;
  }

  updateButtonState() {
    // You can handle additional logic when the checkbox state changes here
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
      (error) => {
        console.log('Error al obtener los detalles del evento', error);
      }
    );
  }

  cancelarCompra() {
    // Cerrar el modal manualmente después de mostrar el mensaje
    const cancelarModal = document.getElementById('cancelarModal');
    const modalBootstrap = bootstrap.Modal.getInstance(cancelarModal);

    clearInterval(this.intervalId); // Detener el temporizador
    this.cancelled = true; // Mostrar el mensaje de cancelación
    
    setTimeout(() => {
      modalBootstrap.hide(); // Cierra el modal
      this.router.navigate(['/eventDetail', this.eventoId], { queryParams: { institucionId: 4 } });
    }, 2000); // Redirige después de 2 segundo
  }

  autocompletarDatosUsuario(): void {
    // Simula los datos obtenidos del servicio o del backend
    const user = JSON.parse(localStorage.getItem('user'));

    this.formData.name = `${user.nombre} ${user.apellido}`;
    this.formData.email = user.email;
    this.formData.phone = user.telefono;
}

  // Validar si el formulario es válido antes de avanzar
  isFormValid(): boolean {
      return this.formData.dni.length === 8 && this.termsAccepted;
  }

  handleContinue() {
    if (this.evento?.precioEntrada === 0) {
      // Lógica para inscribirse sin pasar al paso de pago
      this.inscribirme();
    } else if (this.step === 1) {
      this.step = 2;
    } else {
      // Lógica para proceder con el pago
      //this.pagar();

      this.openPaymentModal();
    }
  }
  
  inscribirme() {
    const ticketRequest: TicketRequest = {
      eventoId: this.eventoId,
      nombresCompletos: this.formData.name,
      dni: this.formData.dni,
      precioTotal: 0
    };

    this.ticketService.generateTicket(ticketRequest).subscribe(
      (response) => {
        console.log('Ticket generado:', response);
        this.router.navigate(['/confirmationScreen'], { queryParams: { ticketId: response.codigo } });
      },
      (error) => {
        console.error('Error al inscribirse:', error);
      }
    );
  }
  
  pagar() {
    const ticketRequest: TicketRequest = {
      eventoId: this.eventoId,
      nombresCompletos: this.formData.name,
      dni: this.formData.dni,
      numeroTransaccion: this.generateTransactionId(), // Handle payment logic to generate this
      precioTotal: this.evento.precioEntrada * this.quantity
    };

    this.ticketService.generateTicket(ticketRequest).subscribe(
      (response) => {
        console.log('Ticket generado:', response);
        this.router.navigate(['/confirmationScreen'], { queryParams: { ticketId: response.codigo } });
      },
      (error) => {
        console.error('Error al realizar el pago:', error);
      }
    );
  }

  validateDniInput(event: KeyboardEvent) {
    const input = String.fromCharCode(event.keyCode);

    if (!/^\d+$/.test(input)) {
      event.preventDefault();
    }
  }

  generateTransactionId(): string {
    return Math.random().toString(36).substring(2, 15); // Placeholder for actual transaction ID logic
  }

  openPaymentModal() {
    this.isPaymentModalOpen = true;
  }

  // Cerrar la modal de pago
  closePaymentModal() {
    this.isPaymentModalOpen = false;
  }

  // Método para subir el comprobante de pago
  uploadProofOfPayment(event: any) {
    const file = event.target.files[0];
    // Lógica para manejar el archivo subido y relacionarlo con el ticket
    console.log('Archivo de comprobante de pago:', file);
  }
}
