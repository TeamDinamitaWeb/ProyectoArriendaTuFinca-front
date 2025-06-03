import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario_services/usuario.service';
import { TipoUsuario } from '../../enums/TipoUsuario';
import AOS from 'aos';
import { Propiedad } from '../../models/Propiedad';
import { Usuario } from '../../models/Usuario';
import { EstadoPropiedad } from '../../enums/EstadoPropiedad';
import { PropiedadService } from '../../services/propiedad_services/propiedad.service';

@Component({
  selector: 'app-publicar-propiedad',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './publicar-propiedad.component.html',
  styleUrl: './publicar-propiedad.component.css'
})
export class PublicarPropiedadComponent implements OnInit{

  propiedad: Propiedad;
  usuario: Usuario | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private propiedadService: PropiedadService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    
    this.propiedad = new Propiedad(
      '',
      '',
      '',
      '',
      1,
      0,
      EstadoPropiedad.DISPONIBLE,
    );
  }
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }

    const usuario = this.usuarioService.getUsuarioDesdeToken();
    if (usuario) {
      this.usuario = usuario;
    } else {
      alert('Error: No se encontró el usuario. Inicia sesión nuevamente.');
      this.router.navigate(['/login']);
    }
  }

  publicarPropiedad() {
    if (!this.usuario) return;

    const propiedadDTO: any = {
      titulo: this.propiedad.titulo,
      descripcion: this.propiedad.descripcion,
      direccion: this.propiedad.direccion,
      municipio: this.propiedad.municipio,
      capacidad: this.propiedad.capacidad,
      precioPorNoche: this.propiedad.precioPorNoche,
      estado: this.propiedad.estado,
      status: this.propiedad.status,
      usuarioId: this.usuario.id, // solo se envía el ID
    };

    this.propiedadService.crearPropiedad(propiedadDTO).subscribe({
      next: () => {
        alert('Propiedad publicada exitosamente.');
        this.router.navigate(['/usuario-logueado']);
      },
      error: (error) => {
        console.error('Error al publicar la propiedad:', error);
        alert('Ocurrió un error al publicar la propiedad.');
      }
    });
  }

  volverHome() {
    this.router.navigate(['/usuario-logueado']);
  }

}
