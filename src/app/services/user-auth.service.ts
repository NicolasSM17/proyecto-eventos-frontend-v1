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

  public setRoles(roles:[]){
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles():[]{
    return JSON.parse(localStorage.getItem('roles'))
  }

  public setToken(jwtToken: string){
    localStorage.setItem('token', jwtToken);
  }

  public getToken(): string{
    return localStorage.getItem('token');
  }

  public clear(){
    localStorage.clear();
  }

  public isLoggedIn(){
    return this.getRoles() && this.getToken();
  }

  public isAdmin(){
    const roles: any[] = this.getRoles();
    return roles[0].nombre == 'ADMIN';
  }

  public isUser(){
    const roles: any[] = this.getRoles();
    return roles[0].nombre == 'USER';
  }

  public isOrganizador(){
    const roles: any[] = this.getRoles();
    return roles[0].nombre == 'ORGANIZADOR'
  }
}
