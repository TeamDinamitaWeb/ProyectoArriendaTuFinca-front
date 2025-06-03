import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../models/Usuario';
import { jwtDecode } from 'jwt-decode';
import { TipoUsuario } from '../../enums/TipoUsuario';
import { TokenDTO } from '../../models/Token';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:8081/api/usuarios';

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  obtenerTodos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  // Obtener todos incluyendo eliminados
  obtenerTodosInclusoEliminados(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/all-including-deleted`);
  }

  // Obtener por ID
  obtenerPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  // Crear nuevo usuario
  crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/crear`, usuario);
  }

  // Actualizar usuario
  actualizarUsuario(id: number, usuario: Usuario): Observable<TokenDTO> {
    return this.http.put<TokenDTO>(`${this.apiUrl}/${id}`, usuario);
  }

  // Eliminar usuario
  eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getUsuarioDesdeToken(): Usuario | null {
    const token = localStorage.getItem('jwt_token');
    if (!token) return null;

    try {
      const payload = jwtDecode<any>(token);
      return new Usuario(
        payload.nombre,
        payload.apellido,
        payload.sub, // correo
        payload.tipoUsuario as TipoUsuario,
        undefined, // contraseña no la necesitas aquí
        payload.status,
        payload.id
      );
    } catch {
      return null;
    }
  }
}