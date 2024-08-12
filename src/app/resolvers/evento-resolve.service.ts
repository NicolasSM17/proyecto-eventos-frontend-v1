import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Evento } from '../model/event.model';
import { EventService } from '../services/event.service';
import { ImageProcessingService } from '../services/image-processing.service';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventoResolveService implements Resolve<Evento>{

  constructor(private eventoService: EventService, private imageProcessingService: ImageProcessingService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Evento>{
    const id = route.paramMap.get("eventoId");

    if(id){
      // entonces tenemos que obtener detalles del backend
      return this.eventoService.getByIdEvento(id).pipe(
        map(evento => this.imageProcessingService.createImages(evento))
      );
    } else {
      // devolver producto vacío observable
      return of(this.getEventoDetails());
    }
  }

  getEventoDetails(){
    return {
      id: null,
      titulo: "",
      descripcion: "",
      fecha: "",
      hora: "",
      direccion: "",
      direccionUrl: "",
      precioEntrada: 0,
      institucion: null,
      categorias: [],
      organizador: null,
      eventoImagenes: []
    };
  }
}
