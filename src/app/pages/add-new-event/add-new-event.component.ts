import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild   } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/model/category.model';
import { Evento } from 'src/app/model/event.model';
import { FileHandle } from 'src/app/model/file-handle.model';
import { Institution } from 'src/app/model/institution.model';
import { CategoryService } from 'src/app/services/category.service';
import { EventService } from 'src/app/services/event.service';
import { InstitutionService } from 'src/app/services/institution.service';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { Combo } from 'src/app/model/combo.model';
import { ComboService } from 'src/app/services/combo.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-add-new-event',
  templateUrl: './add-new-event.component.html',
  styleUrls: ['./add-new-event.component.css']
})
export class AddNewEventComponent implements OnInit{
  step: any = 1;
  subStep: any = 1;
  selectedCategoriaIds: number[] = [];
  institutions: Institution[] = [];
  isNewEvento = true;
  categorias: Category[] = [];
  evento: Evento = {
    id: null,
    titulo: "",
    descripcion: "",
    fecha: "",
    hora: "", // Formato HH:mm
    direccion: "",
    direccionUrl: "",
    precioEntrada: 0,
    instituciones: [],
    categorias: [],
    organizador: null,
    eventoImagenes:[],
    asistentes: [],
    combos: [], // Add combos here
    boost: false,
    terminosAceptados: false
  };
  isMaxCombosReached = false;
  modalRef: any;
  
  comboEditado: any = {};

  aceptarTerminos: boolean = false;

  combos = [];

  imagenesPredefinidas = [
    'https://png.pngtree.com/png-clipart/20231013/original/pngtree-classic-burger-and-crispy-fries-delicious-combo-png-image_13295935.png',
    'https://ejemplo.com/imagen2.png',
    'https://ejemplo.com/imagen3.png',
    'https://ejemplo.com/imagen4.png',
    'https://ejemplo.com/imagen5.png',
    'https://ejemplo.com/imagen6.png'
  ];


  @ViewChild('content') modalContent: TemplateRef<any>;

  constructor(private eventService: EventService, private categoryService: CategoryService,
              private institutionService: InstitutionService, private sanitizer: DomSanitizer,
              private userAuthService: UserAuthService, private router: Router, private comboService: ComboService,
              private modalService: NgbModal, private cdr: ChangeDetectorRef) { }
  
  ngOnInit(): void {
    this.getCategory();
    this.getInstituciones();
    
    this.combos = this.comboService.getCombos();
    /*
    this.evento = this.activatedRoute.snapshot.data['evento'];

    if(this.evento && this.evento.id){
      this.isNewEvento = false;
    }*/
      this.institutionService.getInstitution().subscribe(
        (institutions) => {
        this.institutions = institutions.map(
          (institution) => ({ ...institution, selected: false }));
      });
  }

  selectPoint(institution: Institution) {
    // Cambia el estado de selección de la institución (toggle)
    institution.selected = !institution.selected;
  
    // Actualiza el array de instituciones seleccionadas en el evento
    this.evento.instituciones = this.institutions.filter(inst => inst.selected);
  }

  addEvento(eventoForm: NgForm){
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
    this.evento.combos = this.combos;

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

  next(){
    this.step = this.step + 1;
  }

  specialNext(){
    this.step = 10;
  }

  cancel(): void {
    this.router.navigate(['/selectInstitution']); 
  }

  previus(){
    this.step = this.step - 1;
  }

  specialPrevius(){
    this.step = 7;
  }

  omitir() {
    this.step = 10;
  }

  getInstituciones(){
    this.institutionService.getInstitution().subscribe(
      (response: Institution[]) => {
        this.institutions = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  getCategory(){
    this.categoryService.getCategory().subscribe(
      (response: Category[]) => {
        this.categorias = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  prepareFormData(evento: Evento): FormData{
    const formData = new FormData();

    formData.append(
      'evento', new Blob([JSON.stringify(evento)], {type: 'application/json'})
    );

    for(var i = 0; i < evento.eventoImagenes.length; i++){
      formData.append(
        'imageFile',
        evento.eventoImagenes[i].file,
        evento.eventoImagenes[i].file.name
      );
    }

    return formData;
  }

  onFileSelected(event){
    
    if(event.target.files){

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

  removeImages(i: number){
    this.evento.eventoImagenes.splice(i, 1);
  }

  fileDropped(fileHandle: FileHandle){
    this.evento.eventoImagenes.push(fileHandle);
  }


  agregarProveedores() {
    this.step = 8;
  }

  continuarSinProveedores() {
    this.step = 9;
  }

  agregarCombo() {
    const nuevoCombo: Combo = {
      titulo: `Combo ${this.combos.length + 1}`,
      descripcion: '',
      precio: 0
    };
    this.combos.push(nuevoCombo);
    if (this.combos.length >= 6) {
      this.isMaxCombosReached = true;
    }
  }

  eliminarCombo(combo: any) {
    // Lógica para eliminar el elemento "Combo" seleccionado
    this.combos = this.combos.filter(c => c !== combo);
    if (this.combos.length < 6) {
      this.isMaxCombosReached = false;
    }
  }

  modificarCombo(combo: any) {
    this.comboEditado = {...combo};  // Crea una copia del combo
    this.modalRef = this.modalService.open(this.modalContent);
  }

  guardarCambios() {
    const index = this.combos.findIndex(c => c.id === this.comboEditado.id);
    if (index !== -1) {
      this.combos[index] = {...this.comboEditado};
      this.comboService.updateCombo(this.comboEditado);
    }
    this.modalRef.close();
  }

  cerrarModal() {
    this.modalRef.dismiss('Cross click');
  }

  seleccionarImagen(imagen: string) {
    this.comboEditado.imagen = imagen;
  } 

  onCheckboxChange() {
    this.aceptarTerminos = !this.aceptarTerminos;
    this.cdr.detectChanges(); // Forzar la detección de cambios si es necesario
  }
}
