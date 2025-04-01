export class SolicitudArriendo {
    constructor(
        public id: number,
        public fechaInicio: Date,
        public fechaFin: Date,
        public estado: string,
        public usuarioId: number,
        public propiedadId: number,
        public precioTotal: number
    ) {}
}