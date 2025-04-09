import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-account',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './delete-account.component.html',
  styleUrl: './delete-account.component.css'
})
export class DeleteAccountComponent {
  idUsuario: number = 0;

  constructor(
    private usuarioService: UsuarioService
  ) { }

  eliminar() {
    if (this.idUsuario > 0) {
      this.usuarioService.deleteUsuario(this.idUsuario)
        .then(() => {
          alert('Usuario eliminado correctamente');
        })
        .catch(() => {
          alert('Error al eliminar el usuario');
        });
    } else {
      alert('Por favor ingresa un ID válido');
    }
  }
}
