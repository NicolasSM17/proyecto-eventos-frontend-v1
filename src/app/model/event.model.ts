import { Asistente } from "./asistente.model";
import { Category } from "./category.model";
import { Combo } from "./combo.model";
import { FileHandle } from "./file-handle.model";
import { Institution } from "./institution.model";
import { User } from "./user.model";

export interface Evento{
    id: number;
    titulo: string;
    descripcion: string;
    fecha: string;
    hora: string; // Formato HH:mm
    horaDate?: Date; // Nuevo campo opcional para almacenar la hora como Date
    direccion: string;
    direccionUrl: string;
    precioEntrada: number;
    instituciones: Institution[];
    categorias: Category[];
    organizador: User;
    eventoImagenes: FileHandle[];
    asistentes: Asistente[];
    combos: Combo[];
    boost: boolean;
    terminosAceptados: boolean;
}