import { Routes } from '@angular/router';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'create-account', component: CreateAccountComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },  // login será la vista por defecto
    { path: '**', redirectTo: 'login' }
];
