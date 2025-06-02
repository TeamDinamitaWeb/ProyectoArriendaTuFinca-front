import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Usuario } from '../../models/Usuario';
import AOS from 'aos';
import { AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UsuarioService } from '../../services/usuario_services/usuario.service';
import { TipoUsuario } from '../../enums/TipoUsuario';
import { TokenDTO } from '../../models/Token';
@Component({
  selector: 'app-update-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './update-usuario.component.html',
  styleUrl: './update-usuario.component.css'
})
export class UpdateUsuarioComponent implements OnInit, AfterViewInit {
  
  usuario: Usuario = new Usuario('', '', '', TipoUsuario.ARRENDATARIO, '');
  tipoUsuarioEnum = TipoUsuario;

  isLoading = true;
  errorMessage = '';

  constructor(private usuarioService: UsuarioService, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    const userData = this.usuarioService.getUsuarioDesdeToken();
    if (userData) {
      this.usuario = new Usuario(
        userData.nombre,
        userData.apellido,
        userData.correo,
        userData.tipoUsuario,
        '', // contraseña vacía para no mostrarla
        userData.status,
        userData.id
      );
    } else {
      this.errorMessage = 'Error: No se pudo obtener el usuario desde el token.';
    }
    this.isLoading = false;
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }
  }

  guardarCambios() {
    this.isLoading = true;
    this.usuarioService.actualizarUsuario(this.usuario.id!, this.usuario).subscribe({
      next: (respuesta: TokenDTO) => {
        localStorage.setItem('jwt_token', respuesta.token);
        alert('Perfil actualizado correctamente.');
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Error al actualizar el perfil.';
        this.isLoading = false;
      }
    });
  }
}
