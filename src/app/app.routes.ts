import { Routes } from '@angular/router';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { LoginComponent } from './components/login/login.component';
import { DeleteAccountComponent } from './components/delete-account/delete-account.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'create-account', component: CreateAccountComponent },
    { path: 'delete-account', component: DeleteAccountComponent }, // Cambia a DeleteAccountComponent si es necesario
    { path: '', redirectTo: 'login', pathMatch: 'full' },  // login será la vista por defecto
    { path: '**', redirectTo: 'login' }
];
