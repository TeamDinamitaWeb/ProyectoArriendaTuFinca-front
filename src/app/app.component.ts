import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from './models/Usuario';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
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