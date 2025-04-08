export class Usuario {
    constructor(
        public id: number | null,
        public nombre: string,
        public apellido: string,
        public correo: string,
        public contrasena: string,
        public tipoUsuario: string
    ) {}
}