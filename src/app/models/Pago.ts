import { SolicitudArriendo } from "./SolicitudArriendo";

export class Pago {
    constructor(
        public id: number,
            public solicitud: SolicitudArriendo,
            public valor: number,
            public banco: string,
            public numeroCuenta: string,
            public fechaPago: Date,
            public estado: string
    ) {}
}