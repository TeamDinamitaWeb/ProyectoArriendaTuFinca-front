import { Component } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})

export class CreateAccountComponent {

  usuario: Usuario = new Usuario(null, '', '', '', '', '');

  mensaje: string = '';
  error: string = '';

  constructor(
    private usuarioService: UsuarioService
  ) { }

  crearUsuario(){
    if (!this.usuario.nombre || !this.usuario.apellido || !this.usuario.correo || !this.usuario.contrasena || !this.usuario.tipoUsuario) {
      this.error = 'Todos los campos son obligatorios';
      this.mensaje = '';
      return;
    }

    this.usuarioService.postUsuario(this.usuario)
      .then(usuarioCreado => {
        this.mensaje = 'Usuario creado exitosamente';
        this.error = '';
        console.log('Usuario creado:', usuarioCreado);
      })
      .catch(error => {
        this.error = 'Error al crear el usuario';
        this.mensaje = '';
        console.error('Error creando usuario:', error);
      });



  }
}
