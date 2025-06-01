import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pago } from '../../models/Pago';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private apiUrl = 'http://localhost/api/pagos';

  constructor(private http: HttpClient) {}

  // Obtener todos los pagos activos
  obtenerTodos(): Observable<Pago[]> {
    return this.http.get<Pago[]>(this.apiUrl);
  }

  // Obtener todos los pagos, incluso eliminados
  obtenerTodosInclusoEliminados(): Observable<Pago[]> {
    return this.http.get<Pago[]>(`${this.apiUrl}/all-including-deleted`);
  }

  // Obtener pago por ID
  obtenerPorId(id: number): Observable<Pago> {
    return this.http.get<Pago>(`${this.apiUrl}/${id}`);
  }

  // Crear nuevo pago
  crearPago(pago: Pago): Observable<Pago> {
    return this.http.post<Pago>(this.apiUrl, pago);
  }

  // Actualizar pago existente
  actualizarPago(id: number, pago: Pago): Observable<Pago> {
    return this.http.put<Pago>(`${this.apiUrl}/${id}`, pago);
  }

  // Eliminar pago
  eliminarPago(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}