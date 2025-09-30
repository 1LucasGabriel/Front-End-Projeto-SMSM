import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  constructor(
    private router: Router
  ) {}

  public irPara(rota: string[]) {
    this.router.navigate(rota);
  }

  public buscarData(cidade: string) {
    const agora = new Date();
    const dia = agora.getDate();
    const mes = agora.toLocaleString("pt-BR", { month: "long" });
    const ano = agora.getFullYear();

    return `${cidade}, ${dia} de ${mes} de ${ano}`;
  }

  public buscarNomeUsuario() {
    return localStorage.getItem('user');
  }

  public buscarIdUsuario() {
    return localStorage.getItem('id');
  }
}