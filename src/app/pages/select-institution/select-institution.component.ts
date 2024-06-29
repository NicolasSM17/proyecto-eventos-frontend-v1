import { Component, OnInit } from '@angular/core';
import { Institution } from 'src/app/model/institution.model';

@Component({
  selector: 'app-select-institution',
  templateUrl: './select-institution.component.html',
  styleUrls: ['./select-institution.component.css']
})
export class SelectInstitutionComponent implements OnInit{
  institutions: Institution[] = [
    { name: 'CIBERTEC', img: 'https://seeklogo.com/images/C/cibertec-logo-08375FAEAA-seeklogo.com.png'},
    { name: 'UTP', img: 'https://logosenvector.com/logo/img/utp-universidad-tecnologica-del-peru-4374.png'},
    { name: 'UPC', img: 'https://seeklogo.com/images/U/universidad-peruana-de-ciencias-aplicadas-upc-logo-B98C3A365C-seeklogo.com.png'},
    { name: 'UPN', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkXVyN-bCrvNCuW2q8Z88-kpCvBnaul5AGpQ&s'},
    { name: 'Senati', img: 'https://i.vimeocdn.com/portrait/21848295_640x640'},
    { name: 'San Marcos', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/UNMSM_coatofarms_seal.svg/1158px-UNMSM_coatofarms_seal.svg.png'},
    { name: 'U de Lima', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Universidad_de_Lima_logo.png/220px-Universidad_de_Lima_logo.png'},
    { name: 'Idat', img: 'https://seeklogo.com/images/I/idat-logo-1EBB75EA82-seeklogo.com.png'}
  ];

  currentPosition = 0;
  itemsToShow = 5;

  constructor() {}

  ngOnInit(): void {
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
}
