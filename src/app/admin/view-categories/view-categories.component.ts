import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit{

  categorias: Category[] = [];
  editCategorias: Category;
  deleteCategorias: Category;

  constructor(private categoryService: CategoryService, private router: Router){}

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias(){
    this.categoryService.getCategory().subscribe(
      (response: Category[]) => {
        this.categorias = response;
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  onAddCategoria(addForm: NgForm){
    //document.getElementById('add-category-form').click();
    const category = addForm.value;
    
    this.categoryService.save(category).subscribe(
      (response: Category) => {
        console.log(response);
        addForm.reset();
        this.getCategorias();
        alert("se agregó exitosamente, PUEDES CERRAR EL FORMULARIO")
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        addForm.reset();
      }
      
    );
  }

  /*
    cerrar(){
      const cerrar = document.getElementById('cerrar');
      cerrar.setAttribute('data-dismiss', 'modal');
      
      setTimeout(() => {
            
          }, 3000);
    
    }
  */

  onUpdateCategoria(categoriaId: number ,category: Category){
    this.categoryService.update(categoriaId, category).subscribe(
      (response: Category) => {
        console.log(response);
        this.getCategorias();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  onDeleteCategoria(categoriaId: number){
    this.categoryService.delete(categoriaId).subscribe(
      (response: void) => {
        console.log(response);
        this.getCategorias();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  onOpenModal(category: Category, mode: string){
    const container = document.getElementById('main-container');
    const button = document.createElement('button');

    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editCategorias = category;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteCategorias = category;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container.appendChild(button);
    button.click();
  }
}
