import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.css']
})
export class PaymentMethodsComponent implements OnInit {

  creditCards = [
    { imageUrl: 'visa-logo.png', name: 'ITALO LINARES', expiry: '12/27', id: 1 },
    { imageUrl: 'visa-logo.png', name: 'ITALO LINARES', expiry: '25/28', id: 2 }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSelectPaymentMethod(paymentMethodId: number) {
    console.log('Selected Payment Method ID:', paymentMethodId);
   
  }

  openAddPaymentMethod() {
    this.router.navigate(['/add-payment-method']);
  }
}