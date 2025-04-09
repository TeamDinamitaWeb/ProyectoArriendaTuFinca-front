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
  private proyectoUrlAllUsuarios = 'http://localhost/usuarios/all-including-deleted';

  constructor() { }

  getUsuarios(): Promise<Usuario[]> {
    return axios.get<Usuario[]>(this.proyectoUrlUsuarios)
      .then(response => response.data)
      .catch((error) => {
        console.error('Error obteniendo usuarios:', error);
        return [];
      });
  }

  getAllUsuarios(): Promise<Usuario[]> {
    return axios.get<Usuario[]>(this.proyectoUrlAllUsuarios)
      .then(response => response.data)
      .catch((error) => {
        console.error('Error obteniendo todos los usuarios incluyendo los eliminados:', error);
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

  deleteUsuario(id: number): Promise<void> {  
    return axios.delete<void>(`${this.proyectoUrlUsuarios}/${id}`)
      .then(response => response.data)
      .catch((error) => {
        console.error('Error eliminando usuario:', error);
        throw error;
      });
  }

  putUsuario(usuario: Usuario): Promise<Usuario> {
    return axios.put<Usuario>(`${this.proyectoUrlUsuarios}/${usuario.id}`, usuario)
      .then(response => response.data)
      .catch((error) => {
        console.error('Error actualizando usuario:', error);
        throw error;
      });
  }
}
