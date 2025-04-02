import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Usuario } from './models/Usuario';
import { UsuarioService } from './services/usuario.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'Lista de Usuarios';

  usuarios: Usuario[] = [];

  constructor(
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.usuarioService.getUsuarios()
      .then(usuarios => {
        this.usuarios = usuarios;
        console.log('Usuarios obtenidos:', this.usuarios);
      })
      .catch(error => {
        console.error('Error al obtener usuarios:', error);
      });
  }
}