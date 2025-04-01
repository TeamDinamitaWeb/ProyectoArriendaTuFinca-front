export class Propiedad{
    constructor(
        public id: number,
        public nombre: string,
        public descripcion: string,
        public direccion: string,
        public municipio: string,
        public capacidad: number,
        public precioPorNoche: number,
        public estado: string
    ) { }
}