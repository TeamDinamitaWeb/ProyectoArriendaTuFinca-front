import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Solicitud } from '../../models/SolicitudArriendo';
import { Usuario } from '../../models/Usuario';
import { SolicitudService } from '../../services/solicitud_services/solicitud.service';
import { UsuarioService } from '../../services/usuario_services/usuario.service';
import AOS from 'aos';
import { CommonModule, isPlatformBrowser, NgClass } from '@angular/common';
import { EstadoSolicitud } from '../../enums/EstadoSolicitud';
import { AuthService } from '../../services/JWT/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mis-solicitudes-arrendador',
  standalone: true,
  imports: [CommonModule, NgClass, FormsModule],
  templateUrl: './mis-solicitudes-arrendador.component.html',
  styleUrl: './mis-solicitudes-arrendador.component.css'
})
export class MisSolicitudesArrendadorComponent implements OnInit {

  solicitudes: Solicitud[] = [];
  usuarioLogueado: Usuario | null = null;
  mostrarMenuPerfil = false;

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router,
    private solicitudService: SolicitudService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }

    this.usuarioLogueado = this.usuarioService.getUsuarioDesdeToken();

    if (this.usuarioLogueado) {
      this.cargarSolicitudes();
    }
  }

  cargarSolicitudes(): void {
    this.solicitudService.obtenerSolicitudesPorArrendador(this.usuarioLogueado!.id!).subscribe({
      next: (res) => this.solicitudes = res,
      error: (err) => console.error('Error al obtener solicitudes:', err)
    });
  }

  actualizarEstado(solicitud: Solicitud, nuevoEstado: string): void {
    const copia = {
      ...solicitud,
      estado: EstadoSolicitud[nuevoEstado as keyof typeof EstadoSolicitud]
    };

    this.solicitudService.actualizarSolicitud(copia.id!, copia).subscribe({
      next: () => this.cargarSolicitudes(),
      error: (err) => {
        console.error(`Error al actualizar estado:`, err);
        alert('Hubo un problema al actualizar la solicitud.');
      }
    });
  }

  toggleMenuPerfil() {
    this.mostrarMenuPerfil = !this.mostrarMenuPerfil;
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  volverInicio() {
    this.router.navigate(['/usuario-logueado']);
  }

}
