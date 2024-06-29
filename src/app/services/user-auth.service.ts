import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  PATH_OF_API = "http://localhost:8080/api/v1/";

  constructor(private httpClient: HttpClient) { }

  public register(registerData){
    return this.httpClient.post(this.PATH_OF_API + 'auth/register', registerData);
  }

  public login(loginData){
    return this.httpClient.post(this.PATH_OF_API+ "auth/authenticate", loginData);
  }
}
