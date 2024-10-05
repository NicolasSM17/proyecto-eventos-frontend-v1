import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent {
  navItems = [
    { name: "Inicio", id: "inicio" },
    { name: "Información personal", id: "informacion-personal" },
    { name: "Contraseña y seguridad", id: "contrasena-seguridad" },
    { name: "Mis entradas", id: "mis-entradas" },
    { name: "Cerrar sesión", id: "cerrar-sesion" }
  ];

  // Variable para guardar la sección seleccionada
  selectedSection: string = 'informacion-personal';

  // Método que se ejecuta cuando se selecciona una sección
  selectSection(sectionId: string) {
    this.selectedSection = sectionId;
  }
}
