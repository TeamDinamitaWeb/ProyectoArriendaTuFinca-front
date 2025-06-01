import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import AOS from 'aos';
import { TipoUsuario } from '../../enums/TipoUsuario';
import { UsuarioService } from '../../services/usuario_services/usuario.service';


@Component({
  selector: 'app-create-account',
  imports: [CommonModule, FormsModule, RouterModule],
  standalone: true,
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})

export class CreateAccountComponent {

  usuario: Usuario = new Usuario(0, '', '', '', TipoUsuario.ARRENDATARIO, '');
  TipoUsuario = TipoUsuario;

  mensaje: string = '';
  error: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }
  }

  crearUsuario(): void {
    if (!this.usuario.tipoUsuario) {
      alert('Debes seleccionar si eres arrendador o arrendatario.');
      return;
    }

    this.usuarioService.crearUsuario(this.usuario).subscribe({
      next: () => {
        alert('¡Cuenta creada exitosamente!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al registrar el usuario:', err);
        alert('No se pudo crear la cuenta. Verifica los datos e intenta de nuevo.');
      }
    });
  }
}
