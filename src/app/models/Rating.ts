export class Rating {
    constructor(
        public id: number,
        public calificacion: number,
        public calificacionFinca: number,
        public comentarioFinca: string,
        public calificacionArrendatario: number,
        public comentarioArrendatario: string
    ) {}
}