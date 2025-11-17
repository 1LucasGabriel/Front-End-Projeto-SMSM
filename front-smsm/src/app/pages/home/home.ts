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
  public nomeUsuario: string | null = '';
  public perfil: string | null = '';

  constructor(
    private genericService: GenericService
  ) {}

  ngOnInit() {
    this.buscarData();
    if (typeof window !== 'undefined') {
      this.pegarNomeUsuario();
      this.buscarPerfilUsuario();
    }
  }

  public irPara(rota: string[]) {
    this.genericService.irPara(rota);
  }

  public buscarData() {
    this.data = this.genericService.buscarData('Marília');
  }

  public pegarNomeUsuario() {
    this.nomeUsuario = this.genericService.buscarNomeUsuario();
  }

  public sair() {
    this.genericService.logout();
  }

  public buscarPerfilUsuario() {
    this.perfil = this.genericService.getPerfil();
  }
}
