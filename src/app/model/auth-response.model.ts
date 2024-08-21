import { User } from "./user.model";

export interface AuthenticationResponse {
    usuario: User;
    token: string;
}