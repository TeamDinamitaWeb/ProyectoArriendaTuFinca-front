import { TipoUsuario } from "../enums/TipoUsuario";

export class Usuario {
  constructor(
    public id: number,
    public nombre: string,
    public apellido: string,
    public correo: string,
    public tipoUsuario: TipoUsuario, 
    public contrasena?: string,
    public status?: number
  ) {}
}