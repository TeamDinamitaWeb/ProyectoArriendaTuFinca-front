import { SolicitudArriendo } from "./SolicitudArriendo";
import { Usuario } from "./Usuario";

export class Rating {
    constructor(
        public id: number,
        public solicitud: SolicitudArriendo,
        public arrendador: Usuario,
        public arrendatario: Usuario,
        public calificacionFinca: number,
        public comentarioFinca: string,
        public calificacionArrendatario: number,
        public comentarioArrendatario: string
    ) {}
}