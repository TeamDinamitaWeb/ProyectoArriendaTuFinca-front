import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rating } from '../../models/Rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private apiUrl = 'http://localhost:8081/api/ratings';

  constructor(private http: HttpClient) {}

  // Obtener todas las calificaciones activas
  obtenerTodos(): Observable<Rating[]> {
    return this.http.get<Rating[]>(this.apiUrl);
  }

  // Obtener todas las calificaciones, incluyendo eliminadas
  obtenerTodosInclusoEliminados(): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.apiUrl}/all-including-deleted`);
  }

  // Obtener calificación por ID
  obtenerPorId(id: number): Observable<Rating> {
    return this.http.get<Rating>(`${this.apiUrl}/${id}`);
  }

  // Crear nueva calificación
  crearRating(rating: Rating): Observable<Rating> {
    return this.http.post<Rating>(this.apiUrl, rating);
  }

  // Actualizar calificación
  actualizarRating(id: number, rating: Rating): Observable<Rating> {
    return this.http.put<Rating>(`${this.apiUrl}/${id}`, rating);
  }

  // Eliminar calificación
  eliminarRating(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}