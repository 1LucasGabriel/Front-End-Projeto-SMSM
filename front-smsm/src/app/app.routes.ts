import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Solicitacoes } from './pages/solicitacoes/solicitacoes';
import { ListaDemandas } from './pages/lista-demandas/lista-demandas';
import { Dashboards } from './pages/dashboards/dashboards';
import { Vagas } from './pages/vagas/vagas';
import { Triagem } from './pages/triagem/triagem';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login', component: Login},
    { path: 'home', component: Home},
    { path: 'solicitacoes', component: Solicitacoes},
    { path: 'lista-demandas', component: ListaDemandas},
    { path: 'dashboards', component: Dashboards},
    { path: 'vagas', component: Vagas},
    { path: 'triagem', component: Triagem},
];
