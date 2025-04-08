import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario';
import { response } from 'express';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private proyectoUrlUsuarios = 'http://localhost/usuarios';

  constructor() { }

  getUsuarios(): Promise<Usuario[]> {
    return axios.get<Usuario[]>(this.proyectoUrlUsuarios)
      .then(response => response.data)
      .catch((error) => {
        console.error('Error obteniendo usuarios:', error);
        return [];
      });
  }

  postUsuario(usuario: Usuario): Promise<Usuario> {
    return axios.post<Usuario>(this.proyectoUrlUsuarios, usuario)
      .then(response => response.data)
      .catch((error) => {
        console.error('Error creando usuario:', error);
        throw error;
      });
  }
  
}
