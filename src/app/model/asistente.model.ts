import { Ticket } from "./ticket.model";

export interface Asistente {
    id: number;
    nombresCompletos: string;
    dni: string;
    tickets: Ticket[];
}