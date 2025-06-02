import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { TokenDTO } from '../../models/Token';
import { Usuario } from '../../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8081/jwt/security/autenticar';

  constructor(private http: HttpClient) {}

  login(credentials: { correo: string; contrasena: string }): Observable<TokenDTO> {
    return this.http.post<TokenDTO>(`${this.apiUrl}/autenticar`, credentials).pipe(
      tap((response) => {
        localStorage.setItem('jwt_token', response.token);
      })
    );
  }


  logout(): void {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('usuario'); // También borramos el usuario
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUsuario(): Usuario | null {
    const usuarioStr = localStorage.getItem('usuario');
    return usuarioStr ? JSON.parse(usuarioStr) : null;
  }

  getUserInfo(): any {
    const token = this.getToken();
    if (token) {
      try {
        return JSON.parse(jwtDecode<any>(token).sub);
      } catch {
        return null;
      }
    }
    return null;
  }
}