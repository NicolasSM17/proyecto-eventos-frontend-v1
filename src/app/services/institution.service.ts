import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Institution } from '../model/institution.model';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {

  PATH_OF_API = "http://localhost:8080/api/v1/institucion";
  PATH_OF_API_PROD = "http://proyecto-eventos-backend-v1-production.up.railway.app/api/v1/institucion";

  constructor(private httpClient: HttpClient) { }

  getInstitution(): Observable<Institution[]>{
    return this.httpClient.get<Institution[]>(this.PATH_OF_API_PROD + "/listar");
  }

  getByIdInstitution(id: number): Observable<Institution>{
    return this.httpClient.get<Institution>(this.PATH_OF_API_PROD + "/" + id);
  }

  save(institution: Institution): Observable<Institution>{
    return this.httpClient.post<Institution>(this.PATH_OF_API_PROD, institution);
  }

  update(id:number, institution: Institution): Observable<Institution>{
    return this.httpClient.put<Institution>(this.PATH_OF_API_PROD + "/" + id, institution);
  }

  delete(id: number): Observable<void>{
    return this.httpClient.delete<void>(`${this.PATH_OF_API_PROD}/${id}`);
  }
}
