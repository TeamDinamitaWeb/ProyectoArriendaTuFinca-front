import { Usuario } from "./Usuario";

export class Arrendatario {
    constructor(
            public id: number,
            public usuario: Usuario | null
        ) {}
}