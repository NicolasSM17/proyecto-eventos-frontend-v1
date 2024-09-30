import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirmation-screen',
  templateUrl: './confirmation-screen.component.html',
  styleUrls: ['./confirmation-screen.component.css']
})
export class ConfirmationScreenComponent implements OnInit{
  ticketId: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // Obtener el ticketId desde los queryParams
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.ticketId = params['ticketId'];
      }
    );

    // Configurar temporizador para redirigir después de unos segundos
    setTimeout(() => {
      // Redirigir al componente de detalle de compra
      /* this.router.navigate(['/purchaseSummary'], { queryParams: { ticketId: this.ticketId } }); */
      this.router.navigate(['/']);
    }, 5000); // 5000 ms = 5 segundos
  }
}
