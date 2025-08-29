import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  constructor(
    private router: Router
  ) {}

  public irParaSolicitacaoExame() {
     console.log('Clique funcionando!');
    this.router.navigate(['/solicitacao-exame']);
  }
}
