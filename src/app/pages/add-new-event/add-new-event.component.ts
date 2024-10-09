import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
    institucion: { id: null, nombre: "", imagenUrl: "", selected: false},
    categorias: [],
    organizador: null,
    eventoImagenes:[],
    asistentes: [],
    combos: [], // Add combos here
    boost: false,
    terminosAceptados: false
  };

  aceptarTerminos: boolean = false;

  // Add Combo array
  combos: Combo[] = [];

  constructor(private eventService: EventService, private categoryService: CategoryService,
              private institutionService: InstitutionService, private sanitizer: DomSanitizer,
              private userAuthService: UserAuthService, private router: Router){}
  
  ngOnInit(): void {
    this.getCategory();
    this.getInstituciones();

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
    // Unselect all institutions
    this.institutions.forEach(inst => inst.selected = false);
    
    // Select the clicked institution
    institution.selected = true;
  
    // Assign the selected institution to the evento object
    this.evento.institucion = institution;
  }

  addEvento(eventoForm: NgForm){
    const organizadorId = this.userAuthService.getUserId();

    // Assign selected institution to evento object
    const selectedInstitution = this.institutions.find(inst => inst.selected);
    if (selectedInstitution) {
      this.evento.institucion = selectedInstitution;
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
    if (this.combos.length >= 5) {
      // Deshabilitar el botón para agregar combos
    }
  }
}
