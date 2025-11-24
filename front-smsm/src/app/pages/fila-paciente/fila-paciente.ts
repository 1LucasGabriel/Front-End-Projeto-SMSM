import { Component } from '@angular/core';
import { PacienteModel } from '../../models/paciente-model';
import { GenericService } from '../../services/generic-service';
import { AgendamentoCompostoModel, AgendamentoFilaModel } from '../../models/agendamento-model';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-fila-paciente',
  imports: [CommonModule],
  templateUrl: './fila-paciente.html',
  styleUrl: './fila-paciente.scss'
})
export class FilaPaciente {
  public usuario: PacienteModel = {
    id: 0,
    nome: '',
    cpf: '',
    cns: '',
    dataNascimento: '',
    endereco: ''
  }
  public fila: AgendamentoFilaModel[] = [];

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
        this.buscarFilaPaciente();
      });
  }

  public buscarFilaPaciente() {
    this.genericService.getAgendamentoFila(this.usuario.id).subscribe((value) => {
      this.fila = value;
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
