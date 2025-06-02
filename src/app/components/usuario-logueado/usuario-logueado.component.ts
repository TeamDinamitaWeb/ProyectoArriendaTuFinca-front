import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import AOS from 'aos';
import { RouterLink } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { UsuarioService } from '../../services/usuario_services/usuario.service';
@Component({
  selector: 'app-usuario-logueado',
  standalone: true,
  imports: [CommonModule, RouterLink, FooterComponent],
  templateUrl: './usuario-logueado.component.html',
  styleUrl: './usuario-logueado.component.css'
})
export class UsuarioLogueadoComponent implements OnInit{
  
  usuarioLogueado: any = null;
  mostrarMenuPerfil = false;
  
  constructor(private usuarioService: UsuarioService, @Inject(PLATFORM_ID) private platformId: Object) {}

  toggleMenuPerfil() {
    this.mostrarMenuPerfil = !this.mostrarMenuPerfil;
  }

  propiedades = [
    {
      titulo: 'Casa Moderna',
      descripcion: 'Diseño vanguardista con acabados de lujo.',
      imagen: 'https://source.unsplash.com/featured/?modern-house',
      animacion: 'fade-up'
    },
    {
      titulo: 'Apartamento Lujoso',
      descripcion: 'Vista panorámica con espacios abiertos.',
      imagen: 'https://source.unsplash.com/featured/?apartment',
      animacion: 'fade-right'
    },
    {
      titulo: 'Casa de Campo',
      descripcion: 'Ideal para descansar en la naturaleza.',
      imagen: 'https://source.unsplash.com/featured/?cottage',
      animacion: 'fade-left'
    }
  ];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }

    // Obtener datos del usuario desde el token
    this.usuarioLogueado = this.usuarioService.getUsuarioDesdeToken();
      console.log('Usuario logueado:', this.usuarioLogueado);
  }
}