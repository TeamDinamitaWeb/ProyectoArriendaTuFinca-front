import { Injectable } from '@angular/core';
import { Rating } from '../models/Rating';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private proyectoUrlRating = 'http://localhost/ratings';
  private proyectoUrlAllRating = 'http://localhost/ratings/all-including-deleted';

  constructor() { }

  //ver DTO

  getSolicitudes(): Promise<Rating[]> {
    return axios.get<Rating[]>(this.proyectoUrlRating)
      .then(response => response.data)
      .catch((error) => {
        console.error('Error obteniendo ratings:', error);
        return [];
      });
  }

  getAllSolicitudes(): Promise<Rating[]> {
    return axios.get<Rating[]>(this.proyectoUrlAllRating)
      .then(response => response.data)
      .catch((error) => {
        console.error('Error obteniendo todas las ratings incluyendo las eliminadas:', error);
        return [];
      });
  }

  postSolicitud(rating: Rating): Promise<Rating> {
    return axios.post<Rating>(this.proyectoUrlRating, rating)
      .then(response => response.data)
      .catch((error) => {
        console.error('Error creando rating:', error);
        throw error;
      });
  }

  deleteSolicitud(id: number): Promise<void> {  
    return axios.delete<void>(`${this.proyectoUrlRating}/${id}`)
      .then(response => response.data)
      .catch((error) => {
        console.error('Error eliminando rating:', error);
        throw error;
      });
  }

  putSolicitud(solicitud: Rating): Promise<Rating> {
    return axios.put<Rating>(`${this.proyectoUrlRating}/${solicitud.id}`, solicitud)
      .then(response => response.data)
      .catch((error) => {
        console.error('Error actualizando rating con ID ${id}:', error);
        throw error;
      });
  }
  
  getSolicitudById(id: number): Promise<Rating | null> {
    return axios.get<Rating>(`${this.proyectoUrlRating}/ratings/${id}`)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error obteniendo el rating con ID ${id}:`, error);
        return null;
      });
  }
}
