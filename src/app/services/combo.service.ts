import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComboService {

  private combos = [
    { id: 1, nombre: 'Combo 1', descripcion: 'Descripción del combo 1', imagen: 'https://png.pngtree.com/png-clipart/20231013/original/pngtree-classic-burger-and-crispy-fries-delicious-combo-png-image_13295935.png', precio: 10.99 }
    
  ];

  getCombos() {
    return this.combos;
  }

  getCombo(id: number) {
    return this.combos.find(combo => combo.id === id);
  }

  updateCombo(combo: any) {
    const index = this.combos.findIndex(c => c.id === combo.id);
    if (index !== -1) {
      this.combos[index] = combo;
    }
  }
}