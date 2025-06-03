import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Propiedad } from '../../models/Propiedad';

@Injectable({
  providedIn: 'root'
})
export class PropiedadService {
  private apiUrl = 'http://localhost:8081/api/propiedades';

  constructor(private http: HttpClient) {}

  // Obtener todas las propiedades activas
  obtenerTodos(): Observable<Propiedad[]> {
    const token = localStorage.getItem('jwt_token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Propiedad[]>(this.apiUrl, { headers });
  }

  // Obtener todas las propiedades, incluso eliminadas
  obtenerTodosInclusoEliminados(): Observable<Propiedad[]> {
    return this.http.get<Propiedad[]>(`${this.apiUrl}/all-including-deleted`);
  }

  // Obtener propiedad por ID
  obtenerPorId(id: number): Observable<Propiedad> {
    return this.http.get<Propiedad>(`${this.apiUrl}/${id}`);
  }

  // Crear nueva propiedad
  crearPropiedad(propiedad: Propiedad): Observable<Propiedad> {
    const token = localStorage.getItem('jwt_token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<Propiedad>(this.apiUrl, propiedad, { headers });
  }

  actualizarPropiedad(id: number, propiedad: Propiedad): Observable<Propiedad> {
    const token = localStorage.getItem('jwt_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.put<Propiedad>(`${this.apiUrl}/${id}`, propiedad, { headers });
  }

  // Eliminar propiedad
  eliminarPropiedad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}