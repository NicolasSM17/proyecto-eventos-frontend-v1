import { Injectable } from '@angular/core';
import { Combo } from '../model/combo.model';

@Injectable({
  providedIn: 'root'
})
export class ComboService {

  private combos: Combo[] = [
    { id: 1, name: 'Combo Básico', descripcion: 'Descripción del combo 1', imagen: 'https://png.pngtree.com/png-clipart/20231013/original/pngtree-classic-burger-and-crispy-fries-delicious-combo-png-image_13295935.png', precio: 10.99 }
  ];

  private combosConProveedores: Combo[] = [
    { id: 1, name: 'Combo Especial 1', descripcion: 'Combo referencial(Puede ser eliminado)', imagen: 'https://png.pngtree.com/png-vector/20230318/ourmid/pngtree-black-combo-offer-vector-png-image_255090.png', precio: 12.99 },
    { id: 2, name: 'Combo Especial 2', descripcion: 'Combo referencial(Puede ser eliminado)', imagen: 'https://png.pngtree.com/png-vector/20230318/ourmid/pngtree-black-combo-offer-vector-png-image_255090.png', precio: 12.99 }
    
  ];

  getCombos(conProveedor: boolean = false): Combo[] {
    return conProveedor ? this.combosConProveedores : this.combos;
  }

  getCombo(id: number, conProveedor: boolean = false): Combo | undefined {
    const lista = conProveedor ? this.combosConProveedores : this.combos;
    return lista.find(combo => combo.id === id);
  }

  updateCombo(combo: Combo, conProveedor: boolean = false): void {
    const lista = conProveedor ? this.combosConProveedores : this.combos;
    const index = lista.findIndex(c => c.id === combo.id);
    if (index !== -1) {
      lista[index] = combo;
    }
  }

  addCombo(combo: Omit<Combo, 'id'>, esComboConProveedor: boolean = false): Combo {
    const lista = esComboConProveedor ? this.combosConProveedores : this.combos;
    const newId = Math.max(...lista.map(c => c.id), 0) + 1;
    const newCombo = { ...combo, id: newId };
    lista.push(newCombo);
    return newCombo;
  }

  deleteCombo(id: number, conProveedor: boolean = false): void {
    const lista = conProveedor ? this.combosConProveedores : this.combos;
    const index = lista.findIndex(c => c.id === id);
    if (index !== -1) {
      lista.splice(index, 1);
    }
  }
}