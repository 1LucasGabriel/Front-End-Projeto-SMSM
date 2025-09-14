import { Component } from '@angular/core';
import { MatSidenavModule } from "@angular/material/sidenav";
import { GenericService } from '../../services/generic-service';

@Component({
  selector: 'app-solicitacoes',
  imports: [MatSidenavModule],
  templateUrl: './solicitacoes.html',
  styleUrl: './solicitacoes.scss'
})
export class Solicitacoes {
  public data: string = '';

  constructor(
    private genericService: GenericService
  ) {}

  ngOnInit() {
    this.buscarData();
  }

  public irPara(rota: string[]) {
    this.genericService.irPara(rota);
  }

  public buscarData() {
    this.data = this.genericService.buscarData('Marília');
  }
}
