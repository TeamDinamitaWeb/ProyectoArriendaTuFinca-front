import { Routes } from '@angular/router';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { LoginComponent } from './components/login/login.component';
import { DeleteAccountComponent } from './components/delete-account/delete-account.component';
import { UpdateUsuarioComponent } from './components/update-usuario/update-usuario.component';
import { LandingComponent } from './landing/landing.component'; 
import { UsuarioLogueadoComponent } from './components/usuario-logueado/usuario-logueado.component';
import { PropertiesComponent } from './components/properties/properties.component';
import { VerUsuariosComponent } from './components/admin/ver-usuarios/ver-usuarios.component';
import { VerPropiedadComponent } from './components/ver-propiedad/ver-propiedad.component';
import { PublicarPropiedadComponent } from './components/publicar-propiedad/publicar-propiedad.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'delete-account', component: DeleteAccountComponent },
  { path: 'update-usuario', component: UpdateUsuarioComponent },
  { path: 'usuario-logueado', component: UsuarioLogueadoComponent },
  { path: 'properties', component: PropertiesComponent },
  { path: 'ver-usuarios', component: VerUsuariosComponent },
  { path: 'propiedad/:id', component: VerPropiedadComponent },
  { path: 'publicar-propiedad', component: PublicarPropiedadComponent },
  { path: '**', redirectTo: '' },
];

