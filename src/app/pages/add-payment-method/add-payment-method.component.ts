import { Component } from '@angular/core';

@Component({
  selector: 'app-add-payment-method',
  templateUrl: './add-payment-method.component.html',
  styleUrls: ['./add-payment-method.component.css']
})
export class AddPaymentMethodComponent {
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
}
