import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../model/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  PATH_OF_API = "http://localhost:8080/api/v1/tarjeta";
  PATH_OF_API_PROD = "/tarjeta";

  constructor(private httpClient: HttpClient) { }

  save(card: Card): Observable<Card>{
    return this.httpClient.post<Card>(this.PATH_OF_API, card);
  }
  
  getTarjetaByIdUsuario(usuarioId: number): Observable<Card[]>{
    return this.httpClient.get<Card[]>(`${this.PATH_OF_API}/tarjetasPorUsuarioId/${usuarioId}`);
  }

  delete(id: number): Observable<void>{
    return this.httpClient.delete<void>(`${this.PATH_OF_API}/${id}`);
  }
}
