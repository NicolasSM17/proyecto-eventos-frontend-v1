import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '../model/ticket.model';
import { Observable } from 'rxjs';
import { Asistente } from '../model/asistente.model';
import { TicketRequest } from '../model/ticket-request.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  PATH_OF_API = "http://localhost:8080/api/v1/ticket";
  PATH_OF_API_PROD = "http://proyecto-eventos-backend-v1-production.up.railway.app/api/v1/ticket";

  constructor(private httpClient: HttpClient) { }

  getByCodigoTicket(codigo): Observable<Ticket>{
    return this.httpClient.get<Ticket>(`${this.PATH_OF_API_PROD}/getTicketByCodigo/${codigo}`);
  }

  generateTicket(ticketRequest: TicketRequest): Observable<Ticket>{
    return this.httpClient.post<Ticket>(`${this.PATH_OF_API_PROD}/comprar`, ticketRequest);
  }
}
