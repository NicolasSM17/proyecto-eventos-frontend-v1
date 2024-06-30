import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showEmailValidation: boolean = false;
  showPasswordValidation: boolean = false;

  constructor(private userAuthService: UserAuthService, private router: Router){}

  login(loginForm: NgForm){
    
    this.userAuthService.login(loginForm.value).subscribe(
      (response: any) => {
        //console.log('Datos del formulario:', loginForm.value);
        console.log(response);
        this.userAuthService.setToken(response.token);
        this.router.navigate(['/selectInstitution'])
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.showEmailValidation = !this.isValidEmail(this.email);
    this.showPasswordValidation = !this.isValidPassword(this.password);
    
    if (!this.showEmailValidation && !this.showPasswordValidation) {
      console.log('Email:', this.email);
      console.log('Password:', this.password);
      // Aquí puedes añadir la lógica para autenticar al usuario
    }
  }

  isValidEmail(email: string): boolean {
    // RegEx simple para validar el correo electrónico
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  isValidPassword(password: string): boolean {
    return password.length >= 8 && password.length <= 40;
  }
}
