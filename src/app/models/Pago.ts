import { EstadoPago } from "../enums/EstadoPago";

export class Pago {
  constructor(
    public id: number | null,
    public solicitudId: number,
    public valor: number,
    public banco: string,
    public numeroCuenta: string,
    public fechaPago: Date,
    public estado: EstadoPago,
    public status?: number
  ) {}
}