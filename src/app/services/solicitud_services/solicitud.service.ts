import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Solicitud } from '../../models/SolicitudArriendo';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private apiUrl = 'http://localhost/api/solicitudes';

  constructor(private http: HttpClient) {}

  // Obtener todas las solicitudes activas
  obtenerTodos(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(this.apiUrl);
  }

  // Obtener todas las solicitudes (incluso eliminadas)
  obtenerTodosInclusoEliminados(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(`${this.apiUrl}/all-including-deleted`);
  }

  // Obtener solicitud por ID
  obtenerPorId(id: number): Observable<Solicitud> {
    return this.http.get<Solicitud>(`${this.apiUrl}/${id}`);
  }

  // Crear nueva solicitud
  crearSolicitud(solicitud: Solicitud): Observable<Solicitud> {
    return this.http.post<Solicitud>(this.apiUrl, solicitud);
  }

  // Actualizar solicitud
  actualizarSolicitud(id: number, solicitud: Solicitud): Observable<Solicitud> {
    return this.http.put<Solicitud>(`${this.apiUrl}/${id}`, solicitud);
  }

  // Eliminar solicitud
  eliminarSolicitud(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}