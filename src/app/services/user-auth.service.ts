import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  PATH_OF_API = "http://localhost:8080/api/v1/";
  requestHeader = new HttpHeaders( {"No-Auth":"True"} );

  constructor(private httpClient: HttpClient) { }

  public register(registerData){
    return this.httpClient.post(this.PATH_OF_API + 'auth/register', registerData);
  }

  public login(loginData){
    return this.httpClient.post(this.PATH_OF_API+ "auth/authenticate", loginData, {headers: this.requestHeader});
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

  public isAdmin(): boolean {
    const roles: any[] = this.getRoles() || []; 
    if (roles.length === 0) {
      
      return false; 
    }
    return roles.some(role => role.nombre === 'ADMIN');
  }

  public isUser(){
    const roles: any[] = this.getRoles();
    return roles[0].nombre == 'USER';
  }

  public isOrganizador(){
    const roles: any[] = this.getRoles();
    return roles[0].nombre == 'ORGANIZADOR'
  }

  public roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles: any = this.getRoles();

    if(userRoles != null && userRoles){

      for(let i = 0; i < userRoles.length; i++){

        for(let j = 0; j < allowedRoles.length; j++){

          if(userRoles[i].nombre == allowedRoles[j]){
            isMatch = true;

            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }

    return false;
  }
}
