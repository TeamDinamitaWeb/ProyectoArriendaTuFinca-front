import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Usuario } from '../../../models/Usuario';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import AOS from 'aos';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario_services/usuario.service';
@Component({
  selector: 'app-ver-usuarios',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './ver-usuarios.component.html',
  styleUrl: './ver-usuarios.component.css'
})
export class VerUsuariosComponent implements OnInit{
  listaUsuarios: Usuario[] = [];
  mostrarFiltro = false;
  filtroActual: 'todos' | 'activos' | 'eliminados' = 'todos';
  usuariosFiltrados: Usuario[] = [];

  constructor(usuarioService: UsuarioService, @Inject(PLATFORM_ID) private platformId: Object) { } 

  ngOnInit(): void {
    this.getUsuarios();
  }
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }
   }

   getUsuarios() {}
   usuariosFilter(estado: 'todos' | 'activos' | 'eliminados') {}
   updateUsuario() {}
   deleteUsuario() {}
   toggleFiltro(): void {
    this.mostrarFiltro = !this.mostrarFiltro;
   }
}
