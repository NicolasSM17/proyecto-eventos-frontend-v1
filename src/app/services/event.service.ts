import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../model/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  PATH_OF_API = "http://localhost:8080/api/v1/evento";

  constructor(private httpClient: HttpClient) { }

  getEvento(): Observable<Evento[]>{
    return this.httpClient.get<Evento[]>(this.PATH_OF_API);
  }

  getEventoByIdOrganizador(organizadorId: number): Observable<Evento[]>{
    return this.httpClient.get<Evento[]>(`${this.PATH_OF_API}/eventosPorOrganizadorId/${organizadorId}`);
  }

  getEventosByIdInstitucion(institucionId: number): Observable<Evento[]>{
    return this.httpClient.get<Evento[]>(`${this.PATH_OF_API}/eventosPorInstitucionId/${institucionId}`);
  }

  getByIdEvento(eventoId): Observable<Evento>{
    return this.httpClient.get<Evento>(this.PATH_OF_API + "/" + eventoId);
  }

  getEventosConCategoriasSimilares(eventoId: number, institucionId: number): Observable<Evento[]>{
    return this.httpClient.get<Evento[]>(`${this.PATH_OF_API}/${eventoId}/similares`, 
                                        {params: { institucionId }});
  }

  save(evento: FormData): Observable<Evento>{
    return this.httpClient.post<Evento>(this.PATH_OF_API + "/insertar", evento);
  }

  update(evento: Evento): Observable<Evento>{
    return this.httpClient.put<Evento>(this.PATH_OF_API + "/" + evento.id, evento);
  }

  delete(id: number): Observable<void>{
    return this.httpClient.delete<void>(`${this.PATH_OF_API}/${id}`);
  }
}
