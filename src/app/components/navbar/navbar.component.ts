import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isDropdownVisible = false;

  categorias = [
    'Stand up', 'Donación', 'Salud y bienestar', 'Tiendas', 'Conciertos',
    'Entretenimiento', 'Fiestas', 'Seminarios y conferencias', 'Teatro',
    'Viajes & Aventuras', 'Arte & Cultura', 'Cursos y talleres', 'Deportes',
    'Comidas & Bebidas', 'Festivales', 'Tecnología', 'Niños', 'Ayuda Social',
    'Cine'
  ];

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
}
