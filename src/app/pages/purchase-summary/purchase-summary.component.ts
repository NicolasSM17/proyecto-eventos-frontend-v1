import { Component } from '@angular/core';

@Component({
  selector: 'app-purchase-summary',
  templateUrl: './purchase-summary.component.html',
  styleUrls: ['./purchase-summary.component.css']
})
export class PurchaseSummaryComponent {
  eventDetails = {
    title: 'NOCHE DE COMEDIA - ENTRADA LIBRE',
    date: '18 de setiembre de 2024',
    time: '08:00 p.m'
  };

  purchaseDetails = {
    date: '17 de setiembre de 2024',
    time: '12:41 p.m.',
    token: '-',
    transactionNumber: 'CCD255D5C607E3037013'
  };

  customerDetails = {
    name: 'Jesus Nicolas Segovia Matos',
    email: 'segoviamatosjesusnicolas@gmail.com',
    documentType: 'DNI',
    documentNumber: '72724245'
  };

  ticketDetails = {
    type: 'GRATIS',
    quantity: 1,
    price: 0.00
  };
}
