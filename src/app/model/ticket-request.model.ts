export interface TicketRequest {
    eventoId: number;
    nombresCompletos: string;
    dni: string;
    numeroTransaccion?: string; // Optional for free events
    precioTotal: number;
}