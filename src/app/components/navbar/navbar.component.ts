import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  @ViewChild('formContainer') formContainer!: ElementRef;

  isDropdownVisible = false;
  email: string = '';
  password: string = '';
  showEmailValidation: boolean = false;
  showPasswordValidation: boolean = false;

  categorias = [
    'Stand up', 'Donación', 'Salud y bienestar', 'Tiendas', 'Conciertos',
    'Entretenimiento', 'Fiestas', 'Seminarios y conferencias', 'Teatro',
    'Viajes & Aventuras', 'Arte & Cultura', 'Cursos y talleres', 'Deportes',
    'Comidas & Bebidas', 'Festivales', 'Tecnología', 'Niños', 'Ayuda Social',
    'Cine'
  ];

  constructor(private userAuthService: UserAuthService, private router: Router){}

  // Alterna el estado del dropdown
  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  // Escucha los clics fuera del dropdown para cerrarlo
  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    const dropdownMenu = document.getElementById("dropdownMenu");
    const filterButton = document.getElementById("filterButton");

    if (!event.target) return;
    const target = event.target as HTMLElement;

    if (!target.closest('.filter-button-categories') && !target.closest('.dropdown-menu')) {
      if (dropdownMenu?.classList.contains('show')) {
        dropdownMenu.classList.remove('show');
        filterButton?.classList.remove("active");
        this.isDropdownVisible = false;
      }
    }
  }

  public isLoggedIn(){
    return this.userAuthService.isLoggedIn();
  }

  public isAdmin(){
    return this.userAuthService.isAdmin();
  }

  public isUser(){
    return this.userAuthService.isUser();
  }

  public isOrganizador(){
    return this.userAuthService.isOrganizador();
  }

  public logout(){
    this.userAuthService.clear();
    this.router.navigate(['/selectInstitution'])
  }

  /* MODAL LOGIN */
  login(loginForm: NgForm) {
    this.userAuthService.login(loginForm.value).subscribe(
      (response: any) => {
        console.log(response);
        this.userAuthService.setToken(response.token);
        this.router.navigate(['/selectInstitution']);
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
    }
  }

  isValidEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  isValidPassword(password: string): boolean {
    return password.length >= 8 && password.length <= 40;
  }
  
}
