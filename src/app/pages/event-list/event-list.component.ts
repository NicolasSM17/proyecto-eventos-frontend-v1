import { Component, OnInit, AfterViewInit  } from '@angular/core';

declare var bootstrap: any;
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit{
  slides = [
    { image: 'https://cdn.joinnus.com/files/2024/06/LfBSShMvDGCvLLd.png' },
    { image: 'https://cdn.joinnus.com/files/2024/06/p0B3pUzwtDumLcQ.png' },
    { image: 'https://cdn.joinnus.com/files/2024/05/5ez52ZUqddX2U5s.png' }
  ];

  events = [
    { title: 'UNA VIDA', date: 'viernes 07 de junio - 8:00 pm', price: 'S/ 25.00', image: 'https://cdn.joinnus.com/user/3585761/TcS696jHKBRURSk.png' },
    { title: 'Fan Fest - Final UEFA Champions League', date: 'sábado 01 de junio - 12:00 pm', price: 'S/ 20.00', image: 'https://cdn.joinnus.com/user/53328/9EBowQBinOOJs68.jpg' },
    { title: 'Milena Warthon en Trujillo (Pop Andino Tour 2024)', date: 'sábado 01 de junio - 8:00 pm', price: 'S/ 35.00', image: 'https://cdn.joinnus.com/user/3990907/act66565cd812d5e.jpg' }
  ];

  ngOnInit(): void {
    this.addLoadedClassToMain();
    this.addPressEffectToButtons();
    
  }

  

  // Agrega la clase 'loaded' a <main> cuando el componente se inicializa
  addLoadedClassToMain() {
    const main = document.querySelector('main');
    if (main) {
      main.classList.add('loaded');
    }
  }

  // Agrega el efecto de 'pressed' a los botones de compra
  addPressEffectToButtons() {
    const buyButtons = document.querySelectorAll('.btn-comprar');

    buyButtons.forEach(button => {
      button.addEventListener('mousedown', () => {
        button.classList.add('pressed');
      });

      button.addEventListener('mouseup', () => {
        button.classList.remove('pressed');
      });

      button.addEventListener('mouseleave', () => {
        button.classList.remove('pressed');
      });
    });
  }
}
