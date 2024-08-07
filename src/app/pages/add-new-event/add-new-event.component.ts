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

@Component({
  selector: 'app-add-new-event',
  templateUrl: './add-new-event.component.html',
  styleUrls: ['./add-new-event.component.css']
})
export class AddNewEventComponent implements OnInit{
  step: any = 1;
  institutions: Institution[] = [];
  isNewEvento = true;
  categorias: Category[] = [];
  evento: Evento = {
    id: null,
    titulo: "",
    descripcion: "",
    fecha: null,
    hora: "", // Formato HH:mm
    direccion: "",
    direccionUrl: "",
    precio: 0,
    institucion: null,
    categorias: null,
    organizador: null,
    eventoImagenes:[] = []
  };

  constructor(private eventService: EventService, private categoryService: CategoryService,
              private institutionService: InstitutionService, private sanitizer: DomSanitizer,
              private activatedRoute: ActivatedRoute){}
  
  ngOnInit(): void {
    this.getCategory();
    this.getInstituciones();

    /*
    this.evento = this.activatedRoute.snapshot.data['evento'];

    if(this.evento && this.evento.id){
      this.isNewEvento = false;
    }*/
  }

  addEvento(eventoForm: NgForm){

  }

  next(){
    this.step = this.step + 1;
  }

  previus(){
    this.step = this.step - 1;
  }

  getInstituciones(){
    this.institutionService.getInstitution().subscribe(
      (response: Institution[]) => {
        this.institutions = response;
        console.log(response);
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
        console.log(response);
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
}
