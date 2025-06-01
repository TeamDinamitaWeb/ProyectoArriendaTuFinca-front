import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost/jwt/security/autenticar';

  constructor(private http: HttpClient) {}

  login(credentials: { correo: string; contrasena: string }): Observable<any> {
    return this.http.post<string>(`${this.apiUrl}/autenticar-correo-contrasena`, null, {
      params: {
        correo: credentials.correo,
        contrasena: credentials.contrasena
      }
    }).pipe(
      tap(token => {
        localStorage.setItem('jwt_token', token);
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
        return JSON.parse(jwtDecode<any>(token).sub);
      } catch {
        return null;
      }
    }
    return null;
  }
}