import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Institution } from 'src/app/model/institution.model';
import { InstitutionService } from 'src/app/services/institution.service';

@Component({
  selector: 'app-view-institutions',
  templateUrl: './view-institutions.component.html',
  styleUrls: ['./view-institutions.component.css']
})
export class ViewInstitutionsComponent implements OnInit{

  instituciones: Institution[] = [];
  editInstituciones: Institution;
  deleteInstituciones: Institution;

  constructor(private institutionService: InstitutionService){};

  ngOnInit(): void {
    this.getInstituciones();
  }

  getInstituciones(){
    this.institutionService.getInstitution().subscribe(
      (response: Institution[]) => {
        this.instituciones = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  onAddInstitucion(addForm: NgForm){
    //document.getElementById('add-category-form').click();
    const category = addForm.value;
    
    this.institutionService.save(category).subscribe(
      (response: Institution) => {
        console.log(response);
        addForm.reset();
        this.getInstituciones();
        alert("se agregó exitosamente, PUEDES CERRAR EL FORMULARIO")
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        addForm.reset();
      }
      
    );
  }

  onUpdateInstitucion(institucionId: number, institucion: Institution){
    this.institutionService.update(institucionId, institucion).subscribe(
      (response: Institution) => {
        console.log(response);
        this.getInstituciones();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  onDeleteInstitucion(institucionId: number){
    this.institutionService.delete(institucionId).subscribe(
      (response: void) => {
        console.log(response);
        this.getInstituciones();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  onOpenModal(institution: Institution, mode: string){
    const container = document.getElementById('main-container');
    const button = document.createElement('button');

    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editInstituciones = institution;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteInstituciones = institution;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container.appendChild(button);
    button.click();
  }
}
