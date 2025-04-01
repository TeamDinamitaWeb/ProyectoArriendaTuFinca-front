import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Pipol } from './models/Pipol';
import { PipolService } from './services/pipol.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lospipol2';

  datosModeloServicio: Pipol[] = [];
  datosModeloServicioExterno: Pipol[] = [];

  datos = [
    { nombre: "Pablo", apellido: "Márquez" },
    { nombre: "María", apellido: "Pacheco" },
    { nombre: "Francisco", apellido: "Márquez" },
    { nombre: "Miguel", apellido: "Márquez" },
  ]
  datosPipol = [
    new Pipol("Pablo", "Márquez"),
    new Pipol("María", "Pacheco"),
    new Pipol("Francisco", "Márquez"),
    new Pipol("Miguel", "Márquez"),
  ]

  constructor(
    private pipolService: PipolService
  ) {
  }
  ngOnInit() {
    this.cargarPipolService();
    //this.cargarPipolServiceExterno();
  }
  cargarPipolService(){
    this.pipolService.getPipols().subscribe( (data: Pipol[]) => {
        this.datosModeloServicio = data;
      }
    );
  }

  cargarPipolServiceExterno(){
    this.pipolService.getPipolsExternos().then((data: Pipol[]) => {
        this.datosModeloServicioExterno = data;
      }
    ).catch((error) => {
      console.error('Error fetching data:', error);
    });
  }
}