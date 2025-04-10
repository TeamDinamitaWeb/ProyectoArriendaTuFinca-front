import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-update-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-usuario.component.html',
  styleUrl: './update-usuario.component.css'
})
export class UpdateUsuarioComponent {
title = 'Lista de Usuarios';
  usuarios: Usuario[] = [];
  usuarioEditando: Usuario | null = null;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.getUsuarios()
      .then(usuarios => {
        this.usuarios = usuarios;
        console.log('Usuarios obtenidos:', this.usuarios);
      })
      .catch(error => {
        console.error('Error al obtener usuarios:', error);
      });
  }

  seleccionarUsuario(usuario: Usuario) {
    this.usuarioEditando = { ...usuario }; // Clonar el objeto para editar
  }

  actualizarUsuario() {
    if (this.usuarioEditando) {
      this.usuarioService.putUsuario(this.usuarioEditando)
        .then(() => {
          alert('Usuario actualizado correctamente');
          this.usuarioEditando = null;
          this.cargarUsuarios(); // Volver a cargar la lista actualizada
        })
        .catch(error => {
          console.error('Error actualizando usuario:', error);
        });
    }
  }

  cancelarEdicion() {
    this.usuarioEditando = null;
  }
}
