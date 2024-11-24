import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asistente } from '../model/asistente.model';

@Injectable({
  providedIn: 'root'
})
export class AssistantService {

  PATH_OF_API = "http://localhost:8080/api/v1/asistente";
  PATH_OF_API_PROD = "http://proyecto-eventos-backend-v1-production-ceba.up.railway.app/api/v1/asistente";

  constructor(private httpClient: HttpClient) { }

  getAssistant(): Observable<Asistente[]>{
    return this.httpClient.get<Asistente[]>(this.PATH_OF_API_PROD + "/listar");
  }

  getAsistenteByIdEvento(eventoId: number): Observable<Asistente[]>{
    return this.httpClient.get<Asistente[]>(`${this.PATH_OF_API_PROD}/asistentesPorEventoId/${eventoId}`);
  }
}
