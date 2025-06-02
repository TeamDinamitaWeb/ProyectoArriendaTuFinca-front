import { TipoUsuario } from "../enums/TipoUsuario";

export class Usuario {
  constructor(
    public nombre: string,
    public apellido: string,
    public correo: string,
    public tipoUsuario: TipoUsuario, 
    public contrasena?: string,
    public status?: number,
    public id?: number
  ) {}
}