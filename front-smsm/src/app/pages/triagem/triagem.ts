import { Component } from '@angular/core';
import { GenericService } from '../../services/generic-service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-triagem',
  imports: [MatSidenavModule, CommonModule],
  templateUrl: './triagem.html',
  styleUrl: './triagem.scss'
})
export class Triagem {
  public data: string = '';

  constructor(
    private genericService: GenericService,
    ) 
    {
  }

  ngOnInt() {
    this.buscarData();
  }

  public irPara(rota: string[]) {
    this.genericService.irPara(rota);
  }

  public buscarData() {
    this.data = this.genericService.buscarData('Marília');
  }

}
