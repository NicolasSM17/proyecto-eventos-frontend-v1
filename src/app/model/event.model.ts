import { Category } from "./category.model";
import { FileHandle } from "./file-handle.model";
import { Institution } from "./institution.model";
import { User } from "./user.model";

export interface Evento{
    id: number;
    titulo: string;
    descripcion: string;
    fecha: string;
    hora: string; // Formato HH:mm
    direccion: string;
    direccionUrl: string;
    precioEntrada: number;
    institucion: Institution;
    categorias: Category[];
    organizador: User;
    eventoImagenes: FileHandle[];
}