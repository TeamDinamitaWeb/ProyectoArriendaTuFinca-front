import { Injectable } from '@angular/core';
import { Propiedad } from '../models/Propiedad';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PropiedadService {

private proyectoUrlPropiedades = 'http://localhost/propiedades';
private proyectoUrlAllPropiedades = 'http://localhost/propiedades/all-including-deleted';

  constructor() { }

  getPropiedades(): Promise<Propiedad[]> {
    return axios.get<Propiedad[]>(this.proyectoUrlPropiedades)
      .then(response => response.data)
      .catch((error) => {
        console.error('Error obteniendo propiedades:', error);
        return [];
      });
  }

  getAllPropiedades(): Promise<Propiedad[]> {
    return axios.get<Propiedad[]>(this.proyectoUrlAllPropiedades)
      .then(response => response.data)
      .catch((error) => {
        console.error('Error obteniendo todas las propiedades incluyendo las eliminadas:', error);
        return [];
      });
  }

  postPropiedad(propiedad: Propiedad): Promise<Propiedad> {
    return axios.post<Propiedad>(this.proyectoUrlPropiedades, propiedad)
      .then(response => response.data)
      .catch((error) => {
        console.error('Error creando propiedad:', error);
        throw error;
      });
  }

  deletePropiedad(id: number): Promise<void> {  
    return axios.delete<void>(`${this.proyectoUrlPropiedades}/${id}`)
      .then(response => response.data)
      .catch((error) => {
        console.error('Error eliminando propiedad:', error);
        throw error;
      });
  }

  putPropiedad(propiedad: Propiedad): Promise<Propiedad> {
    return axios.put<Propiedad>(`${this.proyectoUrlPropiedades}/${propiedad.id}`, propiedad)
      .then(response => response.data)
      .catch((error) => {
        console.error('Error actualizando propiedad con ID ${id}:', error);
        throw error;
      });
  }

  getPropiedadById(id: number): Promise<Propiedad> {
    return axios.get<Propiedad>(`${this.proyectoUrlPropiedades}/${id}`)
      .then(response => response.data)
      .catch((error) => {
        console.error('Error obteniendo propiedad por ID:', error);
        throw error;
      });
  }
}
