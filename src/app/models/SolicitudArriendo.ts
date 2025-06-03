import { EstadoSolicitud } from '../enums/EstadoSolicitud';

export class Solicitud {
  constructor(
    public id?: number,
    public propiedadId?: number,
    public arrendatarioId?: number,
    public nombrePropiedad?: string,
    public nombreSolicitante?: string,
    public fechaSolicitud?: string,
    public fechaInicio?: string,
    public fechaFin?: string,
    public valor?: number,
    public estado?: EstadoSolicitud,
    public cantidadPersonas?: number,
    public status?: number
  ) {}
}