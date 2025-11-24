import { Component } from '@angular/core';
import { GenericService } from '../../services/generic-service';
import { UsuarioModel } from '../../models/usuario-model';
import { AgendamentoCompostoModel } from '../../models/agendamento-model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-historico',
  imports: [DatePipe],
  templateUrl: './historico.html',
  styleUrl: './historico.scss'
})
export class Historico {
  public usuario: UsuarioModel = {
    id: 0,
    nome: '',
    cpf: '',
    senha: '',
    idUnidadeSaude: 0,
    idPerfil: 0
  }
  public agendamentos: AgendamentoCompostoModel[] = [];

  constructor(
    private genericService: GenericService
  ) {}

  ngOnInit() {
    this.buscarUsuarioLogado();
    this.buscarAgendamentosCompostos();
  }

  public buscarUsuarioLogado() {
    this.genericService.getUsuarioById(Number(this.genericService.buscarIdUsuario()))
      .subscribe((value) => {
        this.usuario = value;
      });
  }

  public buscarAgendamentosCompostos() {
    this.genericService.getAgendamentoComposto().subscribe((value) => {
      this.agendamentos = value;
    });
  }


  public irPara(rota: string[]) {
    this.genericService.irPara(rota);
  }

  public sair() {
    this.genericService.logout();
  }

}
