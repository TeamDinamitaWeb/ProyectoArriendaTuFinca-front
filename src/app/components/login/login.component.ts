import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import AOS from 'aos';
import { AuthService } from '../../services/JWT/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  correo: string = '';
  contrasena: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }
  }

  login() {
    this.authService.login({ correo: this.correo, contrasena: this.contrasena }).subscribe({
      next: (response) => {
        localStorage.setItem('jwt', response.token);
        this.router.navigate(['/usuario-logueado']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert(err?.error?.message || 'Credenciales inválidas. Intenta de nuevo.');
      }
    });
  }

}