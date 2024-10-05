import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-purchase-summary',
  templateUrl: './purchase-summary.component.html',
  styleUrls: ['./purchase-summary.component.css']
})
export class PurchaseSummaryComponent implements OnInit{
  ticketId: string;
  ticketDetails: any;

  constructor(private activatedRoute: ActivatedRoute, private ticketService: TicketService) { }

  ngOnInit(): void {
    // Obtener el ticketId desde los queryParams
    this.activatedRoute.queryParams.subscribe(params => {
      this.ticketId = params['ticketId'];
      this.getTicketDetails();
    });
  }

  getTicketDetails() {
    this.ticketService.getByCodigoTicket(this.ticketId).subscribe(
      (response) => {
        this.ticketDetails = response;
        console.log('Detalles del ticket:', this.ticketDetails);
      },
      (error: HttpErrorResponse) => {
        console.error('Error al obtener detalles del ticket:', error);
      }
    );
  }
}
