import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import AOS from 'aos';

@Component({
  selector: 'app-ver-propiedad',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ver-propiedad.component.html',
  styleUrl: './ver-propiedad.component.css'
})
export class VerPropiedadComponent implements OnInit {
  
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute
  ) {}

  propertyId: string = '1';
  
  // Collection of all properties
  allProperties = [
    {
      id: '1',
      titulo: 'Modern Family Home',
      descripcion: '4-bedroom house in a quiet neighborhood. Includes a pool and spacious backyard.',
      precio: 450000,
      ubicacion: 'Suburbia, California',
      habitaciones: 4,
      banos: 3,
      metros: 240,
      ano: 2019,
      amenidades: [
        'Swimming pool',
        'Spacious backyard',
        'Modern kitchen',
        'Home office',
        'Smart home system'
      ],
      imagenes: [
        'assets/images/f1.webp',
        'assets/images/f2.jpg',
        'assets/images/f3.jpg'
      ]
    },
    {
      id: '2',
      titulo: 'Luxury City Condo',
      descripcion: '2-bedroom condo in the heart of downtown. Features high-end finishes and amenities.',
      precio: 380000,
      ubicacion: 'Downtown, New York',
      habitaciones: 2,
      banos: 2,
      metros: 120,
      ano: 2021,
      amenidades: [
        'Concierge service',
        'Fitness center',
        'Rooftop lounge',
        'Smart home features',
        'Secure parking'
      ],
      imagenes: [
        'assets/images/f2.jpg',
        'assets/images/f1.webp',
        'assets/images/f3.jpg'
      ]
    },
    {
      id: '3',
      titulo: 'Countryside Cottage',
      descripcion: 'Cozy 3-bedroom cottage with a large garden. Perfect for nature lovers.',
      precio: 320000,
      ubicacion: 'Rural Valley, Oregon',
      habitaciones: 3,
      banos: 2,
      metros: 160,
      ano: 2015,
      amenidades: [
        'Large garden',
        'Fireplace',
        'Mountain views',
        'Wood deck',
        'Updated kitchen'
      ],
      imagenes: [
        'assets/images/f3.jpg',
        'assets/images/f1.webp',
        'assets/images/f2.jpg'
      ]
    }
  ];

  // Property to display
  propiedad = this.allProperties[0];

  propiedadesSimilares = [
    {
      id: '4',
      titulo: 'Beachfront Villa',
      descripcion: 'Stunning beachfront property with panoramic ocean views.',
      imagen: 'assets/images/f2.jpg',
      precio: 520000,
      ubicacion: 'Coastal Shore, Florida',
      habitaciones: 4,
      banos: 3
    },
    {
      id: '5',
      titulo: 'Mountain Retreat',
      descripcion: 'Cozy cabin nestled in the mountains with breathtaking views.',
      imagen: 'assets/images/f3.jpg',
      precio: 290000,
      ubicacion: 'Mountain Range, Colorado',
      habitaciones: 3,
      banos: 2
    },
    {
      id: '6',
      titulo: 'Urban Loft',
      descripcion: 'Modern loft in a renovated historical building downtown.',
      imagen: 'assets/images/f1.webp',
      precio: 375000,
      ubicacion: 'Arts District, Chicago',
      habitaciones: 2,
      banos: 2
    }
  ];

  imagenActual = 0;

  cambiarImagen(direccion: number) {
    this.imagenActual = (this.imagenActual + direccion + this.propiedad.imagenes.length) % this.propiedad.imagenes.length;
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }

    // Get property ID from route
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.propertyId = params['id'];
        // Find the property by ID
        const foundProperty = this.allProperties.find(p => p.id === this.propertyId);
        if (foundProperty) {
          this.propiedad = foundProperty;
        }
      }
    });
  }
}
