import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { Propiedad } from '../../models/Propiedad';
import { Router } from '@angular/router';
import { PropiedadService } from '../../services/propiedad_services/propiedad.service';
import { UsuarioService } from '../../services/usuario_services/usuario.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import Aos from 'aos';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mis-propiedades',
  imports: [CommonModule, FormsModule],
  templateUrl: './mis-propiedades.component.html',
  styleUrl: './mis-propiedades.component.css'
})
export class MisPropiedadesComponent {

  usuario: Usuario | null = null;
  propiedades: Propiedad[] = [];
  propiedadesFiltradas: Propiedad[] = [];
  mostrarModal = false;
  propiedadEditando: Propiedad = new Propiedad();

  constructor(
    private usuarioService: UsuarioService,
    private propiedadService: PropiedadService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object 
  ) {}

   ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      Aos.init();
    }

    const usuarioLogueado = this.usuarioService.getUsuarioDesdeToken();
    if (usuarioLogueado) {
      this.usuario = usuarioLogueado;

      this.propiedadService.obtenerTodos().subscribe({
        next: (todas) => {
          this.propiedadesFiltradas = todas.filter(p => p.usuarioId === this.usuario?.id);
        },
        error: (err) => {
          console.error('Error al cargar propiedades:', err);
        }
      });
    }
  }

  volverAlDashboard() {
    this.router.navigate(['/usuario-logueado']);
  }

  editarPropiedad(id: number) {
    this.router.navigate(['/editar-propiedad', id]);
  }

  eliminarPropiedad(id?: number) {
    if (id == null) {
      alert("Property ID is invalid.");
      return;
    }

    if (confirm('Are you sure you want to delete this property?')) {
      this.propiedadService.eliminarPropiedad(id).subscribe({
        next: () => {
          alert('Property deleted successfully.');
          this.propiedadesFiltradas = this.propiedadesFiltradas.filter(p => p.id !== id);
        },
        error: err => {
          console.error(err);
          alert('Failed to delete property.');
        }
      });
    }
  }

  // Mostrar modal con valores
  abrirModal(propiedad: Propiedad) {
    this.propiedadEditando = { ...propiedad }; // clonamos para no afectar el array
    this.mostrarModal = true;
  }
}
