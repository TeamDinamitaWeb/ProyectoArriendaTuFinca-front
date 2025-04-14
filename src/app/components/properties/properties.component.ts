import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/Usuario';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import AOS from 'aos';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css'
})
export class PropertiesComponent implements OnInit{

  constructor(private usuarioService: UsuarioService, @Inject(PLATFORM_ID) private platformId: Object) {}
  usuarioLog = [
      {
        nombre: 'Juan Martin Sanchez'
      }
  ]
  usuarioLogueado = this.usuarioLog[0];
  mostrarMenuPerfil = false;
  
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
    //this.obtenerUsuarioLogueado();
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }
  }
  
  /*obtenerUsuarioLogueado() {
    this.usuarioService.getUsuarios()
      .then(usuario => {
        this.usuarioLogueado = usuario[0];
        console.log('Usuario logueado:', this.usuarioLogueado);
      })
      .catch(error => {
        console.error('Error obteniendo el usuario logueado:', error);
      });
  }*/

}
