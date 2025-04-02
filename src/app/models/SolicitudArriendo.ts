import { Propiedad } from "./Propiedad";
import { Usuario } from "./Usuario";

export class SolicitudArriendo {
    constructor(
        public id: number,
        public arrendatario: Usuario,
        public propiedad: Propiedad,
        public fechaInicio: Date,
        public fechaFin: Date,
        public cantidadPersonas: number,
        public estado: string,
        public fechaSolicitud: Date
    ) {}
}