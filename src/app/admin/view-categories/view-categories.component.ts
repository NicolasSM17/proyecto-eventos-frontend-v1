import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit{

  categorias: Category[] = [];

  constructor(private categoryService: CategoryService){}

  ngOnInit(): void {
    this.categoryService.getCategory().subscribe(
      data => {
        this.categorias = data;
      }
    );
  }
}
