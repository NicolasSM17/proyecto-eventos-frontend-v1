import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../model/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  PATH_OF_API = "http://localhost:8080/api/v1/categoria";

  constructor(private httpClient: HttpClient) { }

  getCategory(): Observable<Category[]>{
    return this.httpClient.get<Category[]>(this.PATH_OF_API);
  }

  getByIdCategory(id: number): Observable<Category>{
    return this.httpClient.get<Category>(this.PATH_OF_API + "/" + id);
  }

  save(category: Category): Observable<Category>{
    return this.httpClient.post<Category>(this.PATH_OF_API, category);
  }

  update(category: Category): Observable<Category>{
    return this.httpClient.put<Category>(this.PATH_OF_API + "/" + category.id, category);
  }

  delete(id: number): Observable<void>{
    return this.httpClient.delete<void>(`${this.PATH_OF_API}/${id}`);
  }
}