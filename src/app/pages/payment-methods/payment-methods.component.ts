import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from 'src/app/model/card.model';
import { CardService } from 'src/app/services/card.service';


@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.css']
})
export class PaymentMethodsComponent implements OnInit {

  usuarioId: number;
  tarjetas: Card[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private cardService: CardService) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.usuarioId = +params['userId'];
        this.getTarjetasDelUsuario();
      }
    );
  }

  onSelectPaymentMethod(paymentMethodId: number) {
    console.log('Selected Payment Method ID:', paymentMethodId);
   
  }

  openAddPaymentMethod() {
    this.router.navigate(['/add-payment-method']);
  }

  getTarjetasDelUsuario(){
    this.cardService.getTarjetaByIdUsuario(this.usuarioId).subscribe(
      (response: Card[]) => {
        this.tarjetas = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}