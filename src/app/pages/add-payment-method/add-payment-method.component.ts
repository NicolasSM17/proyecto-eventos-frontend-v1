import { Component } from '@angular/core';

@Component({
  selector: 'app-add-payment-method',
  templateUrl: './add-payment-method.component.html',
  styleUrls: ['./add-payment-method.component.css']
})
export class AddPaymentMethodComponent {

  firstName: string = '';
  lastName: string = '';
  expirationDate: string = '';
  cardNumber: string = '';
  cvv: string = '';
  

  constructor() {}


  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  // Método para manejar el foco en el input CVV
  onCVVFocus() {
    const cardPreview = document.querySelector('.credit-card-preview');
    if (cardPreview) {
      cardPreview.classList.add('flipped');
    }
  }

  // Método para manejar cuando se pierde el foco en el input CVV
  onCVVBlur() {
    const cardPreview = document.querySelector('.credit-card-preview');
    if (cardPreview) {
      cardPreview.classList.remove('flipped');
    }
  }

  // Método para validar el campo cardNumber
  validateCardNumber(event: any): void {
    const input = event.target;
    input.value = input.value.replace(/\D/g, '').slice(0, 16); 
    this.cardNumber = input.value;

    input.classList.toggle('valid', this.cardNumber.length === 16);
  }

  // Método para validar los nombres (firstName y lastName)
  validateName(event: any): void {
    const input = event.target;
    input.value = input.value.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 50); 

    if (input.id === 'first-name') {
      this.firstName = input.value;
      input.classList.toggle('valid', this.firstName.length >= 3);
    } else if (input.id === 'last-name') {
      this.lastName = input.value;
      input.classList.toggle('valid', this.lastName.length >= 3);
    }
  }

  validateExpirationDate(event: any): void {
    let input = event.target.value.replace(/\D/g, ''); 

    if (input.length > 0) {
      if (input[0] > '1') {
        input = '0' + input;
      }
      if (input.length > 2) {
        input = input.slice(0, 2) + '/' + input.slice(2, 4); // Inserta '/'
      }
    }

    event.target.value = input; 
    this.expirationDate = input; 

    // Cambia la clase si la longitud es exactamente 5 (incluyendo el '/')
    event.target.classList.toggle('valid', this.expirationDate.length === 5);
}



   // Método para validar el campo cvv
   validateCVV(event: any): void {
    const input = event.target;
    input.value = input.value.replace(/\D/g, '').slice(0, 4); 
    this.cvv = input.value;

    input.classList.toggle('valid', this.cvv.length >= 3 && this.cvv.length <= 4);
  }
}
