import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Evento } from '../model/event.model';
import { FileHandle } from '../model/file-handle.model';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitizer: DomSanitizer) { }

  public createImages(evento: Evento){
    const eventoImagenes: any[] = evento.eventoImagenes;
    const eventoImagenesToFileHandle: FileHandle[] = [];

    for(let i = 0; i < eventoImagenes.length; i++){
      const imageFileData = eventoImagenes[i];
      const imageBlob = this.dataURItoBlob(imageFileData.picByte, imageFileData.type);
      const imageFile = new File([imageBlob], imageFileData.name, {type: imageFileData.type});
      const finalFileHandle: FileHandle = {
        file: imageFile, 
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };

      eventoImagenesToFileHandle.push(finalFileHandle);
    }

    evento.eventoImagenes = eventoImagenesToFileHandle;

    return evento;
  }

  public dataURItoBlob(picBytes, imageType){
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for(let i = 0; i < byteString.length; i++){
      int8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array], {type: imageType});

    return blob;
  }
}
