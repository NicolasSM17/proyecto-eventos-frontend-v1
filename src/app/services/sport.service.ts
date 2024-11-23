import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Deporte } from '../model/sport.model';

@Injectable({
  providedIn: 'root'
})
export class SportService {

  PATH_OF_API = "http://localhost:8080/api/v1/deporte";
  PATH_OF_API_PROD = "/deporte";

  constructor(private httpClient: HttpClient) { }

  getDeporte(): Observable<Deporte[]>{
    return this.httpClient.get<Deporte[]>(`${this.PATH_OF_API}/listar`);
  }

  save(deporte: Deporte): Observable<Deporte>{
    return this.httpClient.post<Deporte>(this.PATH_OF_API, deporte);
  }

  update(id: number, deporte: Deporte): Observable<Deporte>{
    return this.httpClient.put<Deporte>(`${this.PATH_OF_API}/${id}`, deporte);
  }

  delete(id: number): Observable<void>{
    return this.httpClient.delete<void>(`${this.PATH_OF_API}/${id}`);
  }
}
