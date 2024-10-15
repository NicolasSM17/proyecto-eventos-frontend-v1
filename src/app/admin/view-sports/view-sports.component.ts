import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Deporte } from 'src/app/model/sport.model';
import { SportService } from 'src/app/services/sport.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-sports',
  templateUrl: './view-sports.component.html',
  styleUrls: ['./view-sports.component.css']
})
export class ViewSportsComponent implements OnInit{

  deportes: Deporte[];
  editDeportes: Deporte;
  deleteDeportes: Deporte;

  constructor(private sportService: SportService, private router: Router){}

  ngOnInit(): void {
    this.getDeportes();
  }

  getDeportes(){
    this.sportService.getDeporte().subscribe(
      (response: Deporte[]) => {
        this.deportes = response;
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  onAddDeporte(addForm: NgForm){
    //document.getElementById('add-category-form').click();
    const sport = addForm.value;
    
    this.sportService.save(sport).subscribe(
      (response: Deporte) => {
        console.log(response);
        addForm.reset();
        this.getDeportes();
        Swal.fire({
          text: "Deporte agregado con exito",
          icon: "success"
        });
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        addForm.reset();
        Swal.fire({
          text: "Error al agregar el deporte",
          icon: "error"
        });
      }
      
    );
  }

  onUpdateDeporte(deporteId: number, deporte: Deporte){
    this.sportService.update(deporteId, deporte).subscribe(
      (response: Deporte) => {
        console.log(response);
        this.getDeportes();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  onDeleteDeporte(deporteId: number){
    this.sportService.delete(deporteId).subscribe(
      (response: void) => {
        console.log(response);
        this.getDeportes();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  onOpenModal(deporte: Deporte, mode: string){
    const container = document.getElementById('main-container');
    const button = document.createElement('button');

    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addSportModal');
    }
    if (mode === 'edit') {
      this.editDeportes = deporte;
      button.setAttribute('data-target', '#updateSportModal');
    }
    if (mode === 'delete') {
      this.deleteDeportes = deporte;
      button.setAttribute('data-target', '#deleteSportModal');
    }
    container.appendChild(button);
    button.click();
  }
}
