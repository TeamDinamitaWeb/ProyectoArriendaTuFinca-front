import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { Solicitud } from '../../models/SolicitudArriendo';
import { SolicitudService } from '../../services/solicitud_services/solicitud.service';
import { UsuarioService } from '../../services/usuario_services/usuario.service';
import { CommonModule, isPlatformBrowser, NgClass, NgFor } from '@angular/common';
import AOS from 'aos';
import { AuthService } from '../../services/JWT/auth.service';
import { Router } from '@angular/router';
import { Pago } from '../../models/Pago';
import { EstadoPago } from '../../enums/EstadoPago';
import { FormsModule, NgModel } from '@angular/forms';
import { PagoService } from '../../services/pago_services/pago.service';
import { Rating } from '../../models/Rating';
import { RatingService } from '../../services/rating_services/rating.service';

@Component({
  selector: 'app-mis-solicitudes-arrendatario',
  standalone: true,
  imports: [CommonModule, NgClass, FormsModule],
  templateUrl: './mis-solicitudes-arrendatario.component.html',
  styleUrl: './mis-solicitudes-arrendatario.component.css'
})
export class MisSolicitudesArrendatarioComponent implements OnInit {

  solicitudes: Solicitud[] = [];
  usuarioLogueado: Usuario | null = null;
  mostrarMenuPerfil = false;

  modalPagoVisible = false;
  solicitudSeleccionada: Solicitud | null = null;
  nuevoPago: Pago = new Pago(0, 0, 0, '', '', new Date(), EstadoPago.PENDIENTE);
  modalCalificacionVisible = false;
  nuevaCalificacion: Rating = new Rating();

  constructor(
    private solicitudService: SolicitudService,
    private authService: AuthService,
    private router: Router,
    private usuarioService: UsuarioService,
    private pagoService: PagoService,
    private ratingService: RatingService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }
    this.usuarioLogueado = this.usuarioService.getUsuarioDesdeToken();
    if (this.usuarioLogueado) {
      this.solicitudService.obtenerSolicitudesPorArrendatario(this.usuarioLogueado.id!).subscribe({
        next: (res) => this.solicitudes = res,
        error: (err) => console.error('Error fetching tenant requests:', err)
      });
    }
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

  abrirModalPago(solicitud: Solicitud) {
    console.log('Solicitud recibida:', solicitud);
    this.solicitudSeleccionada = solicitud;
    this.modalPagoVisible = true;
    this.nuevoPago = new Pago(
      null,
      solicitud.id!,
      solicitud.valor ?? 0, // Ajusta si el valor viene desde solicitud
      '',
      '',
      new Date(),
      EstadoPago.COMPLETADO
    );
  }

  cerrarModalPago() {
    this.modalPagoVisible = false;
    this.solicitudSeleccionada = null;
  }

  enviarPago(): void {
    if (!this.nuevoPago || !this.solicitudSeleccionada) return;

    // Asegurar que la fecha de pago tenga el formato LocalDateTime (con hora)
    if (this.nuevoPago.fechaPago) {
      const fecha = new Date(this.nuevoPago.fechaPago);
      this.nuevoPago.fechaPago = new Date(
        fecha.getFullYear(),
        fecha.getMonth(),
        fecha.getDate(),
        0, 0, 0
      );
    }

    this.pagoService.crearPago(this.nuevoPago).subscribe({
      next: (res) => {
        console.log('Pago registrado:', res);
        alert('Payment submitted successfully!');
        this.cerrarModalPago();
      },
      error: (err) => {
        console.error('Error al enviar el pago:', err);
        alert('An error occurred while submitting the payment.');
      }
    });
  }

  abrirModalCalificacion(solicitud: Solicitud) {
  this.modalCalificacionVisible = true;
  this.nuevaCalificacion = new Rating();

  this.nuevaCalificacion.solicitudId = solicitud.id!;
  this.nuevaCalificacion.arrendadorId = solicitud.propiedadId!; // o busca el arrendador real si tienes acceso
  this.nuevaCalificacion.arrendatarioId = this.usuarioLogueado!.id!;
  this.nuevaCalificacion.nombreUsuario = this.usuarioLogueado!.nombre!;
  this.nuevaCalificacion.nombrePropiedad = solicitud.nombrePropiedad!;
  }

  cerrarModalCalificacion() {
    this.modalCalificacionVisible = false;
  }

  enviarCalificacion() {
    this.ratingService.crearRating(this.nuevaCalificacion).subscribe({
      next: (res) => {
        console.log('Rating saved:', res);
        alert('Thanks for your feedback!');
        this.cerrarModalCalificacion();
      },
      error: (err) => {
        console.error('Error sending rating:', err);
        alert('There was an error submitting your rating.');
      }
    });
  }
}
