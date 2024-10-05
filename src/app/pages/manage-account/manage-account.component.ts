import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit{
  navItems = [
    { name: "Inicio", id: "inicio" },
    { name: "Información personal", id: "informacion-personal" },
    { name: "Contraseña y seguridad", id: "contrasena-seguridad" },
    { name: "Mis entradas", id: "mis-entradas" },
    // Actualiza el item de cerrar sesión para abrir el modal
    { name: "Cerrar sesión", id: "cerrar-sesion", modal: true }
  ];

  // Variable para guardar la sección seleccionada
  selectedSection: string = 'informacion-personal';

  // Variables to store user information
  nombres: string = '';
  apellidos: string = '';
  email: string = ''; // Mocked email, should come from your user data
  telefono: string = ''; // Mocked phone, should come from your user data

  constructor(private userAuthService: UserAuthService, private router: Router){}

  ngOnInit() {
    // Retrieve user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (userData) {
      this.nombres = userData.nombre;
      this.apellidos = userData.apellido;
      this.email = userData.email;
      this.telefono = userData.telefono;
    }
  }

  // Método que se ejecuta cuando se selecciona una sección
  selectSection(sectionId: string) {
    this.selectedSection = sectionId;
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/selectInstitution']);
  }

  editEmail() {
    // Logic to handle email editing
  }

  verifyEmail() {
    // Logic to handle email verification
  }

  verifyPhone() {
    // Logic to handle phone verification
  }
}
