import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BoostRequest } from '../model/boost-request.model';

@Injectable({
  providedIn: 'root'
})
export class BoostService {

  PATH_OF_API = "http://localhost:8080/api/v1/boost";
  PATH_OF_API_PROD = "https://proyecto-eventos-backend-v1-production-ceba.up.railway.app/api/v1/boost";

  constructor(private httpClient: HttpClient) { }

  getBoostRequests(): Observable<BoostRequest[]>{
    return this.httpClient.get<BoostRequest[]>(this.PATH_OF_API_PROD + "/listar");
  }

  generarPeticionDeBoost(boostRequest: BoostRequest, file: File): Observable<BoostRequest>{
    const formData = new FormData();
    formData.append('boostRequest', new Blob([JSON.stringify(boostRequest)], { type: 'application/json' }));
    formData.append('file', file);

    return this.httpClient.post<BoostRequest>(this.PATH_OF_API_PROD, formData);
  }

  marcarPeticionComoPagado(boostRequestId: number): Observable<void> {
    return this.httpClient.patch<void>(`${this.PATH_OF_API_PROD}/marcarPeticionComoPagado/${boostRequestId}`, {});
  }

  marcarPeticionComoRechazado(boostRequestId: number): Observable<void> {
    return this.httpClient.patch<void>(`${this.PATH_OF_API_PROD}/marcarPeticionComoRechazado/${boostRequestId}`, {});
  }
}
