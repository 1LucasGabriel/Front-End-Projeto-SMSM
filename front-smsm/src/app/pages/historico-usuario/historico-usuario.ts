import { Component } from '@angular/core';
import { GenericService } from '../../services/generic-service';
import { PacienteModel } from '../../models/paciente-model';
import { AgendamentoCompostoModel } from '../../models/agendamento-model';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-historico-usuario',
  imports: [DatePipe, CommonModule],
  templateUrl: './historico-usuario.html',
  styleUrl: './historico-usuario.scss'
})
export class HistoricoUsuario {
  public usuario: PacienteModel = {
    id: 0,
    nome: '',
    cpf: '',
    cns: '',
    dataNascimento: '',
    endereco: ''
  }
  public agendamentos: AgendamentoCompostoModel[] = [];

  constructor(
    private genericService: GenericService
  ) {}

  ngOnInit() {
    this.buscarUsuarioLogado();
  }

  public buscarUsuarioLogado() {
    this.genericService.getPacienteById(Number(this.genericService.buscarIdUsuario()))
      .subscribe((value) => {
        this.usuario = value;
        this.buscarDemandasUsuario();
      });
  }

  public buscarDemandasUsuario() {
    this.genericService.getAgendamentoComposto().subscribe((value) => {
      value.forEach(element => {
        if (element.pacienteNome === this.usuario.nome) {
          this.agendamentos.push(element);
        }
      });
    });
  }

  public getStatusColor(status: string) {
    switch(status.toLowerCase()) {
      case 'pendente':
        return 'yellow';
      case 'em andamento':
        return 'blue';
      case 'concluído':
        return 'green';
      case 'cancelado':
        return 'red';
      default:
        return 'black';
    }
  }

  public irPara(rota: string[]) {
    this.genericService.irPara(rota);
  }

  public sair() {
    this.genericService.logout();
  }
}
