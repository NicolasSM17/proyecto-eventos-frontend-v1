import { EstadoBoost } from "./estado-boost.enum";
import { Evento } from "./event.model";
import { ImageCloudinary } from "./image-cloudinary.model";
import { User } from "./user.model";

export interface BoostRequest {
    id?: number; // Opcional, porque se genera automáticamente en el backend
    evento: Evento;
    organizador: User;
    fechaSolicitud: string; // ISO string, porque LocalDate se convierte a string en JSON
    estado: EstadoBoost;
    monto: number;
    image?: ImageCloudinary;
  }