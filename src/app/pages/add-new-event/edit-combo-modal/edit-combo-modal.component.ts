import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ComboService } from 'src/app/services/combo.service';

@Component({
  selector: 'app-edit-combo-modal',
  templateUrl: './edit-combo-modal.component.html',
  styleUrls: ['./edit-combo-modal.component.css']
})
export class EditComboModalComponent {


  imagenesPredefinidas = [
    'https://png.pngtree.com/png-clipart/20231013/original/pngtree-classic-burger-and-crispy-fries-delicious-combo-png-image_13295935.png',
    'https://png.pngtree.com/png-clipart/20231013/original/pngtree-classic-burger-and-crispy-fries-delicious-combo-png-image_13295935.png',
    'https://png.pngtree.com/png-clipart/20231013/original/pngtree-classic-burger-and-crispy-fries-delicious-combo-png-image_13295935.png',
    'https://png.pngtree.com/png-clipart/20231013/original/pngtree-classic-burger-and-crispy-fries-delicious-combo-png-image_13295935.png',
    'https://png.pngtree.com/png-clipart/20231013/original/pngtree-classic-burger-and-crispy-fries-delicious-combo-png-image_13295935.png',
    'https://png.pngtree.com/png-vector/20230318/ourmid/pngtree-black-combo-offer-vector-png-image_255090.png'
  ];

  
  @Input() comboEditado: any;


  constructor(
    public activeModal: NgbActiveModal,
    private comboService: ComboService
  ) {}


  seleccionarImagen(imagen: string) {
    this.comboEditado.imagen = imagen;
  }


  guardarCambios() {
    this.comboService.updateCombo(this.comboEditado);
    this.activeModal.close(this.comboEditado);
  }

  cerrarModal() {
    this.activeModal.dismiss('Cancel click');
  }

}
