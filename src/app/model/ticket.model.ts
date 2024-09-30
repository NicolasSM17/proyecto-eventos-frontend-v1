import { Asistente } from "./asistente.model";
import { Evento } from "./event.model";
import { User } from "./user.model";

export interface Ticket {
    codigo: string;
    fechaCompra: string;
    horaCompra: string;
    numeroTransaccion: string;
    precioTotal: number;
    usuario: User;
    asistente: Asistente;
    evento: Evento;
}