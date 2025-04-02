import { Usuario } from "./Usuario";

export class Arrendador {
    constructor(
        public id: number,
        public usuario: Usuario | null
    ) {}
}