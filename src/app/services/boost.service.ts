import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoostService {

  PATH_OF_API = "http://localhost:8080/api/v1/boost";
  PATH_OF_API_PROD = "https://proyecto-eventos-backend-v1-production.up.railway.app/api/v1/boost";

  constructor(private httpClient: HttpClient) { }

  
}
