import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Institution } from 'src/app/model/institution.model';
import { InstitutionService } from 'src/app/services/institution.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-select-institution',
  templateUrl: './select-institution.component.html',
  styleUrls: ['./select-institution.component.css']
})
export class SelectInstitutionComponent implements OnInit{
  institutions: Institution[] = [];

  currentPosition = 0;
  itemsToShow = 4;

  constructor(private userAuthService: UserAuthService, private institutionService: InstitutionService) {}

  ngOnInit(): void {
    this.getInstituciones();
    this.updateInstitutionsPosition();
  }

  updateInstitutionsPosition() {
    const institutionsElement = document.querySelector(".institutions") as HTMLElement;
    const institutionElements = Array.from(institutionsElement.children) as HTMLElement[];
    const itemWidth = institutionElements[0].offsetWidth + 20; // Ancho del elemento más margen
    const offset = -this.currentPosition * itemWidth;

    institutionsElement.style.transition = "transform 0.5s ease";
    institutionsElement.style.transform = `translateX(${offset}px)`;

    institutionElements.forEach((element, index) => {
        if (index >= this.currentPosition && index < this.currentPosition + this.itemsToShow) {
            element.classList.add("visible");
            element.classList.remove("hidden");
        } else {
            element.classList.remove("visible");
            element.classList.add("hidden");
        }
    });
  }

  prev() {
    this.currentPosition--;
    if (this.currentPosition < 0) {
        this.currentPosition = this.institutions.length - this.itemsToShow;
    }
    this.updateInstitutionsPosition();
  } 

  next() {
    this.currentPosition++;
    if (this.currentPosition > this.institutions.length - this.itemsToShow) {
        this.currentPosition = 0;
    }
    this.updateInstitutionsPosition();
  }

  isAdmin() {
    return this.userAuthService.isAdmin();
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
}
