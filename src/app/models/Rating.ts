export class Rating {
  constructor(
    public id: number,
    public solicitudId: number,
    public arrendadorId: number,
    public arrendatarioId: number,
    public nombreUsuario: string,
    public nombrePropiedad: string,
    public calificacionFinca: number,
    public comentarioFinca: string,
    public calificacionArrendatario: number,
    public comentarioArrendatario: string,
    public status?: number
  ) {}
}