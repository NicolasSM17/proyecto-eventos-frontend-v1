import { Category } from "./category.model";
import { Institution } from "./institution.model";
import { User } from "./user.model";

export interface Evento{
    id: number;
    titulo: string;
    descripcion: string;
    fecha: Date;
    hora: string; // Formato HH:mm
    lugar: string;
    direccion: string;
    direccionUrl: string;
    institucion: Institution;
    categorias: Category[];
    organizador: User;
}