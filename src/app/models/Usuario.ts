export class Usuario {
    constructor(
        public id: number,
        public nombre: string,
        public apellido: string,
        public correo: string,
        public contraseña: string,
        public tipoUsuario: string
    ) {}
}