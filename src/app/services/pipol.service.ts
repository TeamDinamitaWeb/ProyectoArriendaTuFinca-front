import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pipol } from '../models/Pipol';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PipolService {

  constructor() { }

  getPipols():Observable <Pipol[]>{
    return of(
      [
        new Pipol("Pablo", "Márquez"),
        new Pipol("María", "Pacheco"),
        new Pipol("Francisco", "Márquez"),
        new Pipol("Miguel", "Márquez"),
        new Pipol("José", "Márquez"),
      ]
    );
  }

  getPipolsExternos():Promise <Pipol[]>{
    return axios.get<Pipol[]>('http://localhost:8080/api/javeriana/estudiante/estudiante').then(
      response => response.data
    ).catch((error) => {
      console.error('Error fetching data:', error);
      return [];
    }
    );
  }
}