import { Injectable } from '@angular/core';
import { SolicitudArriendo } from '../models/SolicitudArriendo';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SolicitudarriendoService {

  private proyectoUrlSoliArriendos = 'http://localhost/solicitudes';
  private proyectoUrlAllSoliArriendos = 'http://localhost/solicitudes/all-including-deleted';

  constructor() { }

  //ver DTO

  getSolicitudes(): Promise<SolicitudArriendo[]> {
    return axios.get<SolicitudArriendo[]>(this.proyectoUrlSoliArriendos)
      .then(response => response.data)
      .catch((error) => {
        console.error('Error obteniendo solicitudes:', error);
        return [];
      });
  }

  getAllSolicitudes(): Promise<SolicitudArriendo[]> {
    return axios.get<SolicitudArriendo[]>(this.proyectoUrlAllSoliArriendos)
      .then(response => response.data)
      .catch((error) => {
        console.error('Error obteniendo todas las solicitudes incluyendo las eliminadas:', error);
        return [];
      });
  }

  postSolicitud(solicitud: SolicitudArriendo): Promise<SolicitudArriendo> {
    return axios.post<SolicitudArriendo>(this.proyectoUrlSoliArriendos, solicitud)
      .then(response => response.data)
      .catch((error) => {
        console.error('Error creando solicitud:', error);
        throw error;
      });
  }

  deleteSolicitud(id: number): Promise<void> {  
    return axios.delete<void>(`${this.proyectoUrlSoliArriendos}/${id}`)
      .then(response => response.data)
      .catch((error) => {
        console.error('Error eliminando solicitud:', error);
        throw error;
      });
  }

  putSolicitud(solicitud: SolicitudArriendo): Promise<SolicitudArriendo> {
    return axios.put<SolicitudArriendo>(`${this.proyectoUrlSoliArriendos}/${solicitud.id}`, solicitud)
      .then(response => response.data)
      .catch((error) => {
        console.error('Error actualizando solicitud con ID ${id}:', error);
        throw error;
      });
  }
  
  getSolicitudById(id: number): Promise<SolicitudArriendo | null> {
    return axios.get<SolicitudArriendo>(`${this.proyectoUrlSoliArriendos}/solicitudes/${id}`)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error obteniendo la solicitud con ID ${id}:`, error);
        return null;
      });
  }
}
