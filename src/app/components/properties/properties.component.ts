import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import AOS from 'aos';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario_services/usuario.service';
import { PropiedadService } from '../../services/propiedad_services/propiedad.service';
import { Propiedad } from '../../models/Propiedad';
import { FooterComponent } from "../footer/footer.component";
import { AuthService } from '../../services/JWT/auth.service';
import { Solicitud } from '../../models/SolicitudArriendo';
import { SolicitudService } from '../../services/solicitud_services/solicitud.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [CommonModule, RouterLink, FooterComponent, FormsModule],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css'
})
export class PropertiesComponent implements OnInit{

  propiedades: Propiedad[] = [];
  usuarioLogueado: Usuario | null = null;
  mostrarMenuPerfil = false;

  modalDetalleVisible = false;
  modalSolicitudVisible = false;
  propiedadSeleccionada: Propiedad | null = null;

  nuevaSolicitud: Solicitud = new Solicitud();

  constructor(
    private usuarioService: UsuarioService, 
    private propiedadService: PropiedadService,
    private solicitudService: SolicitudService,
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object) {}

    ngOnInit(): void {
      if (isPlatformBrowser(this.platformId)) {
        AOS.init();
      }

      this.usuarioLogueado = this.usuarioService.getUsuarioDesdeToken();

      this.propiedadService.obtenerTodos().subscribe({
        next: (res) => {
          this.propiedades = res;
        },
        error: (err) => {
          console.error('Error fetching properties:', err);
        }
      });
    }

  toggleMenuPerfil() {
    this.mostrarMenuPerfil = !this.mostrarMenuPerfil;
  }

  abrirModalDetalle(propiedad: Propiedad) {
    this.propiedadSeleccionada = propiedad;
    this.modalDetalleVisible = true;
  }

  abrirModalSolicitud() {
    if (!this.propiedadSeleccionada || !this.usuarioLogueado) return;

    this.nuevaSolicitud = new Solicitud();
    this.nuevaSolicitud.propiedadId = this.propiedadSeleccionada.id;
    this.nuevaSolicitud.nombrePropiedad = this.propiedadSeleccionada.titulo;
    this.nuevaSolicitud.arrendatarioId = this.usuarioLogueado.id;
    this.nuevaSolicitud.nombreSolicitante = `${this.usuarioLogueado.nombre} ${this.usuarioLogueado.apellido}`;
    this.nuevaSolicitud.fechaSolicitud = new Date();

    this.modalDetalleVisible = false;
    this.modalSolicitudVisible = true;
  }

  volverADetalle() {
    this.modalSolicitudVisible = false;
    this.modalDetalleVisible = true;
  }

  cerrarModales() {
    this.modalDetalleVisible = false;
    this.modalSolicitudVisible = false;
  }

   enviarSolicitud() {
    this.solicitudService.crearSolicitud(this.nuevaSolicitud).subscribe({
      next: () => {
        alert('Lease request submitted successfully');
        this.cerrarModales();
      },
      error: err => {
        console.error(err);
        alert('Error submitting request');
      }
    });
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
