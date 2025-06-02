import { Component, Inject, OnInit, PLATFORM_ID, ChangeDetectorRef, HostListener, ElementRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import AOS from 'aos';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { UsuarioService } from '../../services/usuario_services/usuario.service';
import { AuthService } from '../../services/JWT/auth.service';
@Component({
  selector: 'app-usuario-logueado',
  standalone: true,
  imports: [CommonModule, RouterLink, FooterComponent],
  templateUrl: './usuario-logueado.component.html',
  styleUrl: './usuario-logueado.component.css'
})
export class UsuarioLogueadoComponent implements OnInit{
  
  usuarioLogueado: any = null;
  mostrarMenuPerfil = false;
  
  constructor(
    private usuarioService: UsuarioService,  
    private router: Router, 
    private authService: AuthService,  
    private cdr: ChangeDetectorRef,
    private eRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object) {}

  propiedades = [
    {
      titulo: 'Casa Moderna',
      descripcion: 'Diseño vanguardista con acabados de lujo.',
      imagen: 'https://source.unsplash.com/featured/?modern-house',
      animacion: 'fade-up'
    },
    {
      titulo: 'Apartamento Lujoso',
      descripcion: 'Vista panorámica con espacios abiertos.',
      imagen: 'https://source.unsplash.com/featured/?apartment',
      animacion: 'fade-right'
    },
    {
      titulo: 'Casa de Campo',
      descripcion: 'Ideal para descansar en la naturaleza.',
      imagen: 'https://source.unsplash.com/featured/?cottage',
      animacion: 'fade-left'
    }
  ];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }

    // Obtener usuario desde token decodificado
    this.usuarioLogueado = this.usuarioService.getUsuarioDesdeToken();
    this.cdr.detectChanges();
  }

  toggleMenuPerfil() {
    this.mostrarMenuPerfil = !this.mostrarMenuPerfil;
  }

  @HostListener('document:click', ['$event'])
  cerrarMenuAlHacerClickAfuera(event: MouseEvent) {
    if (this.mostrarMenuPerfil && !this.eRef.nativeElement.contains(event.target)) {
      this.mostrarMenuPerfil = false;
    }
  }
  
  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}