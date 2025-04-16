import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterModule } from '@angular/router';
import AOS from 'aos';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterOutlet, RouterModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  usuario: Usuario = new Usuario(null, '', '', '', '', '');
  mensaje: string = '';
  constructor(
      private usuarioService: UsuarioService,
      @Inject(PLATFORM_ID) private platformId: Object
    ) { }
  
    ngAfterViewInit(): void {
     if (isPlatformBrowser(this.platformId)) {
       AOS.init();
     }
    }
  login(){}
}
