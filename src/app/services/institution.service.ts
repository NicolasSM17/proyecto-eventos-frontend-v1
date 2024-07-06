import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Institution } from '../model/institution.model';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {

  PATH_OF_API = "http://localhost:8080/api/v1/institucion";

  constructor(private httpClient: HttpClient) { }

  getInstitution(): Observable<Institution[]>{
    return this.httpClient.get<Institution[]>(this.PATH_OF_API);
  }

  getByIdInstitution(id: number): Observable<Institution>{
    return this.httpClient.get<Institution>(this.PATH_OF_API + "/" + id);
  }

  save(institution: Institution): Observable<Institution>{
    return this.httpClient.post<Institution>(this.PATH_OF_API, institution);
  }

  update(institution: Institution): Observable<Institution>{
    return this.httpClient.put<Institution>(this.PATH_OF_API + "/" + institution.id, institution);
  }

  delete(id: number): Observable<void>{
    return this.httpClient.delete<void>(`${this.PATH_OF_API}/${id}`);
  }
}
