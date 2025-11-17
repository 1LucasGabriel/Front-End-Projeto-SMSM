import { Component } from '@angular/core';
import { MatSidenavModule } from "@angular/material/sidenav";
import { GenericService } from '../../services/generic-service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioModel } from '../../models/usuario-model';
import { DemandaModel } from '../../models/demanda-model';
import { VagaComUnidadeModel } from '../../models/vaga-model';
import { AgendamentoModel } from '../../models/agendamento-model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vagas',
  imports: [MatSidenavModule, CommonModule, FormsModule],
  templateUrl: './vagas.html',
  styleUrl: './vagas.scss'
})
export class Vagas {
  public data: string = '';
  public usuario: UsuarioModel = {
    id: 0,
    nome: '',
    cpf: '',
    senha: '',
    idUnidadeSaude: 0,
    idPerfil: 0
  }
  public demandas: DemandaModel[] = [];
  public vagasUnidades: VagaComUnidadeModel[] = [];
  public agendamento: AgendamentoModel = {
    id: 0,
    idDemanda: 0,
    idVaga: 0,
    idUsuarioRegulador: 0,
    dataAgendamento: '',
    dataRealizacao: '',
    statusComparecimento: ''
  }

  constructor(
    private genericService: GenericService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.buscarUsuarioLogado();
    this.buscarDemandas();
    this.buscarVagasComUnidades();
  }

  public buscarUsuarioLogado() {
    this.genericService.getUsuarioById(Number(this.genericService.buscarIdUsuario())).subscribe((value) => {
      this.usuario = value;
    });
  }

  public buscarDemandas() {
    this.genericService.getDemandas().subscribe((value) => {
      this.demandas = value;
    });
  }

  public buscarVagasComUnidades() {
    this.genericService.getVagaComUnidade().subscribe((value) => {
      this.vagasUnidades = value;
    });
  }

  public enviarAgendamento() {
    this.agendamento.idUsuarioRegulador = this.usuario.id;
    this.agendamento.dataAgendamento = new Date().toISOString();
    this.agendamento.statusComparecimento = "Pendente";

    if (!this.agendamento.idDemanda) {
      alert("Selecione uma demanda!");
      return;
    }

    if (!this.agendamento.idVaga) {
      alert("Selecione uma vaga!");
      return;
    }

    this.genericService.postAgendamento(this.agendamento).subscribe((value) => {
      if (value) {
        this.genericService.irPara(['/home']);
      }
    })
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
