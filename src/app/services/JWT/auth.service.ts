import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {jwtDecode} from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/jwt/security'; // Ajusta si es necesario

  constructor(private http: HttpClient) {}

  login(credentials: { correo: string; contrasena: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/autenticar`, credentials).pipe(
      tap(response => {
        localStorage.setItem('jwt_token', response.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUserInfo(): any {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode(token);
      } catch {
        return null;
      }
    }
    return null;
  }
}
