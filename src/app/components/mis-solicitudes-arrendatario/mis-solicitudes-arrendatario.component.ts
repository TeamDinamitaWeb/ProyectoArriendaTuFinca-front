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

  constructor(
    private solicitudService: SolicitudService,
    private authService: AuthService,
    private router: Router,
    private usuarioService: UsuarioService,
    private pagoService: PagoService,
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
    this.solicitudSeleccionada = solicitud;
    this.modalPagoVisible = true;
    this.nuevoPago = new Pago(
      0,
      solicitud.id!,
      solicitud.valor ?? 0, // Ajusta si el valor viene desde solicitud
      '',
      '',
      new Date(),
      EstadoPago.PENDIENTE
    );
  }

  cerrarModalPago() {
    this.modalPagoVisible = false;
    this.solicitudSeleccionada = null;
  }

  enviarPago(): void {
    if (!this.nuevoPago || !this.solicitudSeleccionada) return;

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
}
