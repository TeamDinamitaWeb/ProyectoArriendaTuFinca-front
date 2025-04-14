import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/usuario.service';
import AOS from 'aos';
import { AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-update-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './update-usuario.component.html',
  styleUrl: './update-usuario.component.css'
})
export class UpdateUsuarioComponent implements OnInit, AfterViewInit {
  usuario: Usuario = {
    id: 0,
    nombre: 'juan',
    apellido: '',
    correo: '',
    contrasena: '',
    tipoUsuario: 'ARRENDATARIO'
  };
  isLoading = true;
  errorMessage = '';

  constructor(private usuarioService: UsuarioService, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
      if (isPlatformBrowser(this.platformId)) {
        AOS.init();
      }
    }

  ngOnInit(): void {
    this.cargarUsuarioLogueado();
  }

  cargarUsuarioLogueado() {
    this.isLoading = true;
    this.usuarioService.getUsuarios()
      .then(usuarios => {
        if (usuarios && usuarios.length > 0) {
          // For now, we're taking the first user as the logged-in user
          this.usuario = { ...usuarios[0] };
          this.isLoading = false;
        } else {
          this.errorMessage = 'No users found.';
          this.isLoading = false;
        }
      })
      .catch(error => {
        this.errorMessage = 'Error loading user data.';
        console.error('Error loading user:', error);
        this.isLoading = false;
      });
  }

  guardarCambios() {
    this.isLoading = true;
    this.errorMessage = '';
    this.usuarioService.putUsuario(this.usuario)
      .then(() => {
        alert('User profile updated successfully!');
        this.isLoading = false;
        // Optionally navigate the user back to the profile page
        // this.router.navigate(['/usuario-logueado']);
      })
      .catch(error => {
        this.errorMessage = 'Error updating user profile.';
        console.error('Error updating user:', error);
        this.isLoading = false;
      });
  }
}
