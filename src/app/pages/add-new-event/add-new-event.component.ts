import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild, ElementRef, ViewChildren, QueryList, ChangeDetectorRef, NgZone, Renderer2 } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Category } from 'src/app/model/category.model';
import { Evento } from 'src/app/model/event.model';
import { FileHandle } from 'src/app/model/file-handle.model';
import { Institution } from 'src/app/model/institution.model';
import { CategoryService } from 'src/app/services/category.service';
import { EventService } from 'src/app/services/event.service';
import { InstitutionService } from 'src/app/services/institution.service';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';

import { ComboService } from 'src/app/services/combo.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Combo } from '../../model/combo.model';

import { gsap } from 'gsap';
import { EditComboModalComponent } from './edit-combo-modal/edit-combo-modal.component';

interface ComboWithState extends Combo {
  state: 'active' | 'inactive';
}

@Component({
  selector: 'app-add-new-event',
  templateUrl: './add-new-event.component.html',
  styleUrls: ['./add-new-event.component.css'],
  animations: [
    trigger('noCombosAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8) translateY(50px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
      ]),
      transition(':leave', [
        animate('0.1s ease-in', style({ opacity: 0, transform: 'scale(0.8) translateY(50px)' }))
      ])
    ])
  ]

})
export class AddNewEventComponent implements OnInit {
  step: any = 1;
  subStep: any = 1;
  selectedCategoriaIds: number[] = [];
  institutions: Institution[] = [];
  isNewEvento = true;
  categorias: Category[] = [];
  evento: Evento = {
    id: null,
    codigoAutogenerado: "",
    titulo: "",
    descripcion: "",
    fecha: "",
    hora: "", // Formato HH:mm
    direccion: "",
    direccionUrl: "",
    precioEntrada: 0,
    
    categorias: [],
    organizador: null,
    eventoImagenes: [],
    asistentes: [],

    instituciones: [],
    
    combosRegulares:[],
    combosConProveedores:[],
    
    boost: false,
    terminosAceptados: false
  };

  modalRef: any;



  aceptarTerminos: boolean = false;


  combos: [];
  combosRegulares: ComboWithState[] = [];
  combosConProveedores: ComboWithState[] = [];

 

  isMaxCombosRegularesReached = false;
  isMaxCombosProveedoresReached = false;
  readonly MAX_COMBOS = 10;

  get showNoCombos(): boolean {
    return this.combosConProveedores.length === 0 && this.combosRegulares.length === 0;
  }


    @ViewChildren('comboItem') comboItems!: QueryList<ElementRef>;
    @ViewChildren('comboItemProveedor') comboItemsProveedores: QueryList<ElementRef>;
    @ViewChildren('addButtonProveedor') addButtonProveedores!: QueryList<ElementRef>;
 





  @ViewChild('content') modalContent: TemplateRef<any>;

  constructor(private eventService: EventService, private categoryService: CategoryService,
    private institutionService: InstitutionService, private sanitizer: DomSanitizer,
    private userAuthService: UserAuthService, private router: Router, private comboService: ComboService,
    private modalService: NgbModal, private cdr: ChangeDetectorRef, private ngZone: NgZone, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.getCategory();
    this.getInstituciones();

    

    this.combosRegulares = this.comboService.getCombos().map(combo => ({ ...combo, state: 'active' as const }));
    this.combosConProveedores = this.comboService.getCombos(true).map(combo => ({ ...combo, state: 'active' as const }));
    this.updateMaxCombosReached();
    this.updateShowNoCombos();
    /*
    this.evento = this.activatedRoute.snapshot.data['evento'];

    if(this.evento && this.evento.id){
      this.isNewEvento = false;
    }*/
    this.institutionService.getInstitution().subscribe((institutions) => {
      this.institutions = institutions.map((institution) => ({ ...institution, selected: false }));
    });

  }

  private updateMaxCombosReached(): void {
    this.isMaxCombosRegularesReached = this.combosRegulares.length >= this.MAX_COMBOS;
    this.isMaxCombosProveedoresReached = this.combosConProveedores.length >= this.MAX_COMBOS;
  }






  selectPoint(institution: any) {
   // Cambia el estado de selección de la institución (toggle)
   institution.selected = !institution.selected;
  
   // Actualiza el array de instituciones seleccionadas en el evento
   this.evento.instituciones = this.institutions.filter(inst => inst.selected);
  }
  onCheckboxClick(event: MouseEvent, institution: any) {
    event.stopPropagation();
    this.selectPoint(institution);
  }

  addEvento(eventoForm: NgForm) {
    const organizadorId = this.userAuthService.getUserId();

    // Asignar la(s) instituciones seleccionadas al objeto evento
    const selectedInstitutions = this.institutions.filter(inst => inst.selected);
    if (selectedInstitutions.length > 0) {
        this.evento.instituciones = selectedInstitutions; // Ahora esto es un array
    } else {
        // Puedes manejar el caso donde no se seleccionó ninguna institución, si es necesario
        console.error('No se ha seleccionado ninguna institución.');
        return; // O manejarlo como desees
    }

    // Add selected combos to the event object
    this.evento.combosRegulares = this.combosRegulares;
    this.evento.combosConProveedores = this.combosConProveedores;

    this.evento.terminosAceptados = this.aceptarTerminos;

    const eventoFormData = this.prepareFormData(this.evento);

    this.eventService.save(eventoFormData).subscribe(
      (response: Evento) => {
        eventoForm.reset();
        this.evento.eventoImagenes = [];
        console.log(response);
        this.router.navigate(['/myEvents'], { queryParams: { organizadorId } });
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  next() {
    this.step = this.step + 1;
  }

  specialNext() {
    this.step = 10;
  }

  cancel(): void {

    this.router.navigate(['/selectInstitution']);
  }

  previus() {
    this.step = this.step - 1;
  }

  specialPrevius() {
    this.step = 7;
  }

  omitir() {


    this.step = 10;
  }

  getInstituciones() {
    this.institutionService.getInstitution().subscribe(
      (response: Institution[]) => {
        this.institutions = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  getCategory() {
    this.categoryService.getCategory().subscribe(
      (response: Category[]) => {
        this.categorias = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  prepareFormData(evento: Evento): FormData {
    const formData = new FormData();

    formData.append(
      'evento', new Blob([JSON.stringify(evento)], { type: 'application/json' })
    );

    for (var i = 0; i < evento.eventoImagenes.length; i++) {
      formData.append(
        'imageFile',
        evento.eventoImagenes[i].file,
        evento.eventoImagenes[i].file.name
      );
    }

    return formData;
  }

  onFileSelected(event) {

    if (event.target.files) {

      const file = event.target.files[0];
      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }

      this.evento.eventoImagenes.push(fileHandle);
    }
  }

  removeImages(i: number) {
    this.evento.eventoImagenes.splice(i, 1);
  }

  fileDropped(fileHandle: FileHandle) {
    this.evento.eventoImagenes.push(fileHandle);
  }


  agregarProveedores() {
    this.step = 8;
  }

  continuarSinProveedores() {
    this.step = 9;
  }

  agregarCombo(esComboConProveedor: boolean = false) {
    const listaObjetivo = esComboConProveedor ? this.combosConProveedores : this.combosRegulares;
    const isMaxReached = esComboConProveedor ? this.isMaxCombosProveedoresReached : this.isMaxCombosRegularesReached;
  
    if (isMaxReached) {
      console.warn(`No se pueden agregar más combos ${esComboConProveedor ? 'con proveedores' : 'regulares'}. Límite alcanzado.`);
      return;
    }
  
    const nuevoCombo: Omit<ComboWithState, 'id'> = {
      name: `Combo ${listaObjetivo.length + 1}${esComboConProveedor ? ' (Proveedor)' : ''}`,
      descripcion: 'Descripción básica',
      imagen: 'https://png.pngtree.com/png-vector/20230318/ourmid/pngtree-black-combo-offer-vector-png-image_255090.png',
      precio: 0,
      state: 'active'
    };
  
    if (esComboConProveedor) {
      (nuevoCombo as any).proveedor = 'Nombre del Proveedor';
    }
  
    this.ngZone.run(() => {
      // Capturar la posición actual del botón antes de añadir el nuevo combo
      const addButtonItems = esComboConProveedor ? this.addButtonProveedores : null;
      const addButton = addButtonItems?.first?.nativeElement;
      const buttonRect = addButton?.getBoundingClientRect();
  
      const comboAgregado = this.comboService.addCombo(nuevoCombo, esComboConProveedor);
      listaObjetivo.push({ ...comboAgregado, state: 'active' as const });
  
      this.updateMaxCombosReached();
  
      requestAnimationFrame(() => {
        this.cdr.detectChanges();
  
        const comboItems = esComboConProveedor ? this.comboItemsProveedores : this.comboItems;
        if (comboItems && comboItems.last) {
          const nuevoElemento = comboItems.last.nativeElement;
  
          // Animar entrada del nuevo combo
          this.renderer.setStyle(nuevoElemento, 'opacity', '0');
          this.renderer.setStyle(nuevoElemento, 'transform', 'scale(0.8) translateY(50px)');
  
          gsap.to(nuevoElemento, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: "back.out(1.7)"
          });
  
          // Animar el reposicionamiento del botón
          const newButtonRect = addButton?.getBoundingClientRect();
          if (addButton && buttonRect && newButtonRect) {
            const deltaX = buttonRect.left - newButtonRect.left;
            const deltaY = buttonRect.top - newButtonRect.top;
  
            gsap.fromTo(addButton,
              {
                x: deltaX,
                y: deltaY
              },
              {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: "back.out(1.7)"
              }
            );
          }
  
          this.ngZone.run(() => {
            this.cdr.detectChanges();
          });
        }
      });
    });
  }




  eliminarCombo(combo: ComboWithState, esComboConProveedor: boolean = false) {
    const listaObjetivo = esComboConProveedor ? this.combosConProveedores : this.combosRegulares;
    const index = listaObjetivo.findIndex(c => c.id === combo.id);
    
    if (index !== -1) {
      const comboItems = esComboConProveedor ? this.comboItemsProveedores : this.comboItems;
      const comboElements = comboItems.toArray();
      const comboElement = comboElements[index].nativeElement;
  
      // Capturar posiciones iniciales de todos los elementos, incluyendo el botón
      const addButtonItems = esComboConProveedor ? this.addButtonProveedores : null;
      const addButton = addButtonItems?.first?.nativeElement;
      const initialPositions = comboElements.map(el => {
        const rect = el.nativeElement.getBoundingClientRect();
        return { left: rect.left, top: rect.top };
      });
      const buttonInitialRect = addButton?.getBoundingClientRect();
  
      // Animación de salida del combo a eliminar
      gsap.to(comboElement, {
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
        onComplete: () => {
          this.comboService.deleteCombo(combo.id, esComboConProveedor);
  
          if (esComboConProveedor) {
            this.combosConProveedores = this.comboService.getCombos(true).map(combo => ({ ...combo, state: 'active' as const }));
            this.isMaxCombosProveedoresReached = this.combosConProveedores.length >= 10;
          } else {
            this.combosRegulares = this.comboService.getCombos().map(combo => ({ ...combo, state: 'active' as const }));
            this.isMaxCombosRegularesReached = this.combosRegulares.length >= 10;
          }
  
          this.cdr.detectChanges();
  
          // Capturar nuevas posiciones
          const finalPositions = comboItems.toArray().map(el => {
            const rect = el.nativeElement.getBoundingClientRect();
            return { left: rect.left, top: rect.top };
          });
          const buttonFinalRect = addButton?.getBoundingClientRect();
  
          this.ngZone.runOutsideAngular(() => {
            // Animar reposicionamiento de combos
            gsap.fromTo(
              comboElements.filter((_, i) => i !== index).map(item => item.nativeElement),
              {
                x: (i) => initialPositions[i < index ? i : i + 1].left - finalPositions[i].left,
                y: (i) => initialPositions[i < index ? i : i + 1].top - finalPositions[i].top
              },
              {
                x: 0,
                y: 0,
                duration: 0.3,
                ease: "power2.out",
                stagger: 0.05
              }
            );
  
            // Animar reposicionamiento del botón
            if (addButton && buttonInitialRect && buttonFinalRect) {
              gsap.fromTo(addButton,
                {
                  x: buttonInitialRect.left - buttonFinalRect.left,
                  y: buttonInitialRect.top - buttonFinalRect.top
                },
                {
                  x: 0,
                  y: 0,
                  duration: 0.3,
                  ease: "power2.out",
                  delay: 0.1 // Pequeño delay para que siga el flujo de los combos
                }
              );
            }
          });
  
          this.ngZone.run(() => {
            this.cdr.detectChanges();
          });
        }
      });
    }
  }


modificarCombo(combo: ComboWithState, esComboConProveedor: boolean = false) {
  const modalRef = this.modalService.open(EditComboModalComponent, { windowClass: 'modal-custom-bg' });
  modalRef.componentInstance.comboEditado = { ...combo };
  modalRef.componentInstance.esComboConProveedor = esComboConProveedor;

  modalRef.result.then((result) => {
    if (result) {
      this.comboService.updateCombo(result, esComboConProveedor);
      
      if (esComboConProveedor) {
        this.combosConProveedores = this.comboService.getCombos(true).map(combo => ({ ...combo, state: 'active' as const }));
      } else {
        this.combosRegulares = this.comboService.getCombos().map(combo => ({ ...combo, state: 'active' as const }));
      }

      // Actualizar el combo específico en la lista local
      const listaObjetivo = esComboConProveedor ? this.combosConProveedores : this.combosRegulares;
      const index = listaObjetivo.findIndex(c => c.id === result.id);
      if (index !== -1) {
        listaObjetivo[index] = { ...result, state: 'active' as const };
      }

      // Forzar la detección de cambios
      this.cdr.detectChanges();
    }
  }).catch((reason) => {
    // Modal cerrado sin guardar
    console.log('Modal cerrado sin guardar', reason);
  });
}

updateShowNoCombos() {
  this.cdr.detectChanges();
}


  trackByCombo(index: number, combo: any): number {
    return combo.id;
  }

  onCheckboxChange() {
    this.aceptarTerminos = !this.aceptarTerminos;
    this.cdr.detectChanges(); // Forzar la detección de cambios si es necesario
  }
  
}
