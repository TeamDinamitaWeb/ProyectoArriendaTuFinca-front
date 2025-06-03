import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Solicitud } from '../../models/SolicitudArriendo';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private apiUrl = 'http://localhost:8081/api/solicitudes';

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

  obtenerSolicitudesPorArrendador(arrendadorId: number): Observable<Solicitud[]> {
    const token = localStorage.getItem('jwt_token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<Solicitud[]>(
      `${this.apiUrl}/por-arrendador/${arrendadorId}`,
      { headers }
    );
  }

  obtenerSolicitudesPorArrendatario(arrendatarioId: number): Observable<Solicitud[]> {
  const token = localStorage.getItem('jwt_token');

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  return this.http.get<Solicitud[]>(
    `${this.apiUrl}/por-arrendatario/${arrendatarioId}`,
    { headers }
  );
}

  // Crear nueva solicitud
  crearSolicitud(solicitud: Solicitud): Observable<Solicitud> {
    const token = localStorage.getItem('jwt_token');
    console.log('TOKEN ENVIADO:', token); // asegúrate que no es null

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<Solicitud>(this.apiUrl, solicitud, { headers });
  }


  // Actualizar solicitud
  actualizarSolicitud(id: number, solicitud: Solicitud): Observable<Solicitud> {
    const token = localStorage.getItem('jwt_token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    return this.http.put<Solicitud>(`${this.apiUrl}/${id}`, solicitud, { headers });
  }

  // Eliminar solicitud
  eliminarSolicitud(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}