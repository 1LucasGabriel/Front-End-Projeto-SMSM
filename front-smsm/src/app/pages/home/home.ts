import { Component } from '@angular/core';
import { MatSidenavModule } from "@angular/material/sidenav";
import { GenericService } from '../../services/generic-service';

@Component({
  selector: 'app-home',
  imports: [MatSidenavModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

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
