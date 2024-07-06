import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private userAuthService:UserAuthService) { }

  public roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if(userRoles != null && userRoles){
      for(let i = 0; i < userRoles.length; i++){
        for(let j = 0; j < allowedRoles.length; j++){
          if(userRoles[i].roleName == allowedRoles[j]){
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
