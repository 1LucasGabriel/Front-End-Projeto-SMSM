import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Solicitacoes } from './pages/solicitacoes/solicitacoes';
import { ListaDemandas } from './pages/lista-demandas/lista-demandas';
import { Dashboards } from './pages/dashboards/dashboards';
import { Vagas } from './pages/vagas/vagas';
import { Triagem } from './pages/triagem/triagem';
import { AuthGuard } from './guards/auth-guard';
import { HistoricoUsuario } from './pages/historico-usuario/historico-usuario';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},

    { path: 'login', component: Login},

    { path: 'home', component: Home, canActivate: [AuthGuard]},
    { path: 'solicitacoes', component: Solicitacoes, canActivate: [AuthGuard]},
    { path: 'lista-demandas', component: ListaDemandas, canActivate: [AuthGuard]},
    { path: 'dashboards', component: Dashboards, canActivate: [AuthGuard]},
    { path: 'vagas', component: Vagas, canActivate: [AuthGuard]},
    { path: 'triagem', component: Triagem, canActivate: [AuthGuard]},
    { path: 'historico-usuario', component: HistoricoUsuario, canActivate: [AuthGuard]},
];
