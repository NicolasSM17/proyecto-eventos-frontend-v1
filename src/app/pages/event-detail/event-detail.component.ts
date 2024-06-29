import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit{
  fechaEvento: string = '4 de mayo de 2024';
  horaEvento: string = '19:00';
  lugarEvento: string = 'Lima, PE';
  organizadorEvento: string = 'Nombre del organizador';
  ubicacion: string = 'Lima, PE';
  direccion: string = 'AV. Carlos Izaguirre 178 – Lima norte (a 3 cdras de Mega Plaza)';
  mapaLink: string = 'https://www.google.com.pe/maps/dir//-11.98928,-77.060195/@-11.98928,-77.060195,15z';

  eventosSimilares = [
    {
      nombre: 'Nombre del Evento Similar 1',
      fecha: '5 de mayo de 2024',
      imagen: 'https://via.placeholder.com/800x300?text=Evento+1',
      url: 'url-a-tu-evento-similar',
      precio: 'XX.XX'
    },
    {
      nombre: 'Nombre del Evento Similar 2',
      fecha: '6 de mayo de 2024',
      imagen: 'https://via.placeholder.com/800x300?text=Evento+2',
      url: 'url-a-tu-evento-similar',
      precio: 'XX.XX'
    },
    {
      nombre: 'Nombre del Evento Similar 3',
      fecha: '7 de mayo de 2024',
      imagen: 'https://via.placeholder.com/800x300?text=Evento+3',
      url: 'url-a-tu-evento-similar',
      precio: 'XX.XX'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Optionally, you can add animation logic here on component initialization
    const eventoInfo = document.querySelector('.evento-info');
    eventoInfo?.classList.add('visible');
  }
}
