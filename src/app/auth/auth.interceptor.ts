import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { UserAuthService } from '../services/user-auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userAuthService: UserAuthService, private router: Router) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if (req.headers.get('No-Auth') == 'True') {
      return next.handle(req.clone());
    }

    const token = this.userAuthService.getToken();

    if (token) {
      req = this.addToken(req, token);
    }

    return next.handle(req).pipe(
      catchError(
        (err: HttpErrorResponse) => {
          console.log(err.status)

          if (err.status == 401) {
            // Token ha expirado, redirigir a la página de login
            this.userAuthService.clear(); // Eliminar el token almacenado
            this.router.navigate(['/login']);
          } else if (err.status == 403) {
            this.router.navigate(['/forbidden']);
          }

          return throwError("Some thing is wrong");
        }
      )
    );
  }

  private addToken(request: HttpRequest<any>, token: string){

    return request.clone({
        setHeaders:{
            Authorization: `Bearer ${token}`
        }
    });
}
}
