import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Solicitacoes } from './pages/solicitacoes/solicitacoes';
import { ListaDemandas } from './pages/lista-demandas/lista-demandas';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login', component: Login},
    { path: 'home', component: Home},
    { path: 'solicitacoes', component: Solicitacoes},
    { path: 'lista-demandas', component: ListaDemandas},
];
