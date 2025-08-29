import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { SolicitacaoExame } from './pages/solicitacao-exame/solicitacao-exame';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login', component: Login},
    { path: 'home', component: Home},
    { path: 'solicitacao-exame', component: SolicitacaoExame}
];
