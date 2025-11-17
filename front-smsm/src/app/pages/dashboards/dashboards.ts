import { Component } from '@angular/core';
import { MatSidenavModule } from "@angular/material/sidenav";
import { GenericService } from '../../services/generic-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboards',
  imports: [MatSidenavModule, CommonModule],
  templateUrl: './dashboards.html',
  styleUrl: './dashboards.scss'
})
export class Dashboards {

  public data: string = '';

  public porcentagem = 85;
  data2 = [
    { label: 'Cardiologia', value: 35 },
    { label: 'Ortopedia', value: 25 },
    { label: 'Pediatria', value: 18 }
  ];

  constructor(
    private genericService: GenericService
  ) {}

  maxValue() {
    return Math.max(...this.data2.map(d => d.value));
  }

  ngOnInit() {
    this.buscarData();
  }

  public irPara(rota: string[]) {
    this.genericService.irPara(rota);
  }

  public buscarData() {
    this.data = this.genericService.buscarData('Marília');
  }

  public sair() {
    this.genericService.logout();
  }
}
