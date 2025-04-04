import { Injectable } from '@angular/core';
import { Propiedad } from '../models/Propiedad';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PropiedadService {

private proyectoUrlUsuarios = 'http://localhost/propiedades';

  constructor() { }

  getPRopiedades(): Promise<Propiedad[]> {
    return axios.get<Propiedad[]>(this.proyectoUrlUsuarios)
      .then(response => response.data)
      .catch((error) => {
        console.error('Error obteniendo usuarios:', error);
        return [];
      });
  }
}
