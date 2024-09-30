import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent {
  darkMode = true;
  navItems = [
    "Inicio", "Información personal", "Contraseña y seguridad", 
    "Mis entradas", "Mis productos", "Mis eventos creados", "Mis códigos de canje", "Cerrar sesión"
  ];
}
