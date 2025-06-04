import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const token = localStorage.getItem('jwt_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<Rating[]>(this.apiUrl, { headers });
  }

  // Obtener todas las calificaciones, incluyendo eliminadas
  obtenerTodosInclusoEliminados(): Observable<Rating[]> {
    const token = localStorage.getItem('jwt_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<Rating[]>(`${this.apiUrl}/all-including-deleted`, { headers });
  }

  // Obtener calificación por ID
  obtenerPorId(id: number): Observable<Rating> {
    const token = localStorage.getItem('jwt_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<Rating>(`${this.apiUrl}/${id}`, { headers });
  }

  // Crear nueva calificación
  crearRating(rating: Rating): Observable<Rating> {
    const token = localStorage.getItem('jwt_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<Rating>(this.apiUrl, rating, { headers });
  }

  // Actualizar calificación
  actualizarRating(id: number, rating: Rating): Observable<Rating> {
    const token = localStorage.getItem('jwt_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put<Rating>(`${this.apiUrl}/${id}`, rating, { headers });
  }

  // Eliminar calificación
  eliminarRating(id: number): Observable<void> {
    const token = localStorage.getItem('jwt_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}