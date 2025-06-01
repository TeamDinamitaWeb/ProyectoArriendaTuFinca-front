import { EstadoPropiedad } from "../enums/EstadoPropiedad";
import { Usuario } from "./Usuario";

export class Propiedad {
  constructor(
    public id: number,
    public titulo: string,
    public descripcion: string,
    public direccion: string,
    public municipio: string,
    public capacidad: number,
    public precioPorNoche: number,
    public estado: EstadoPropiedad,
    public usuario?: Usuario, // Mostrar info del dueño
    public status?: number    // Solo se maneja elementos eliminados
  ) {}
}