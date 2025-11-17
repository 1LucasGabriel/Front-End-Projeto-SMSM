import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatSidenavModule } from "@angular/material/sidenav";
import { GenericService } from '../../services/generic-service';
import { PacienteService } from '../../services/paciente.service';
import { PacienteModel } from '../../models/paciente-model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProcedimentoModel } from '../../models/procedimento-model';
import { DemandaModel } from '../../models/demanda-model';
import { UsuarioModel } from '../../models/usuario-model';

@Component({
  selector: 'app-solicitacoes',
  standalone: true,
  imports: [MatSidenavModule, FormsModule, CommonModule],
  templateUrl: './solicitacoes.html',
  styleUrls: ['./solicitacoes.scss']
})
export class Solicitacoes {
  @ViewChild('container') container!: ElementRef;
  
  public data: string = '';
  public perfil: string | null = '';
  public nomeUsuario: string | null = '';
  public pacientes: PacienteModel[] = [];
  public searchTerm: string = '';
  public sugestoes: PacienteModel[] = [];
  public pacienteSelecionado?: PacienteModel;

  public procedimentos: ProcedimentoModel[] = [];
  public searchTermProcedimento: string = '';
  public sugestoesProcedimento: ProcedimentoModel[] = [];
  public procedimentoSelecionado?: ProcedimentoModel;

  public solicitacao: DemandaModel = {
    idPaciente: 0,
    pacienteNome: '',
    idProcedimento: 0,
    procedimentoNome: '',
    idUnidadeSolicitante: 0,
    idUsuarioSolicitante: 0,
    dataSolicitacao: '',
    prioridade: '',
    status: '',
    justificativa: ''
  }

  public usuario: UsuarioModel = {
    id: 0,
    nome: '',
    cpf: '',
    senha: '',
    idUnidadeSaude: 0,
    idPerfil: 0
  }

  constructor(
    private genericService: GenericService,
    // private pacienteService: PacienteService,
  ) {}

  ngOnInit() {
    this.buscarData();
    this.buscarPerfilUsuario();
    this.pegarNomeUsuario();
    this.buscarPacientes();
    this.buscarProcedimentos();
    this.buscarUsuarioLogado();
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

  public buscarUsuarioLogado() {
    this.genericService.getUsuarioById(Number(this.genericService.buscarIdUsuario())).subscribe((value) => {
      this.usuario = value;
    })
  }

  public buscarPerfilUsuario() {
    this.perfil = this.genericService.getPerfil();
  }

  public pegarNomeUsuario() {
    this.nomeUsuario = this.genericService.buscarNomeUsuario();
  }

  public buscarPacientes() {
    this.genericService.getPacientes().subscribe((value) => {
      this.pacientes = value;
    })
  }
  
  public filtrarPacientes() {
    const termo = this.searchTerm.toLowerCase();
    this.sugestoes = this.pacientes.filter(p =>
      p.nome.toLowerCase().includes(termo) || p.cns.includes(termo)
    );
  }

  public selecionarPaciente(paciente: PacienteModel) {
    this.pacienteSelecionado = paciente;
    this.searchTerm = `${paciente.nome} - ${paciente.cns}`;
    this.sugestoes = [];
  }



  public buscarProcedimentos() {
    this.genericService.getProcedimentos().subscribe((value) => {
      this.procedimentos = value;
    })
  }
  
  public filtrarProcedimentos() {
    const termo = this.searchTerm.toLowerCase();
    this.sugestoesProcedimento = this.procedimentos.filter(p =>
      p.nomeProcedimento.toLowerCase().includes(termo) || p.codigoProcedimento.includes(termo)
    );
  }

  public selecionarProcedimento(procedimento: ProcedimentoModel) {
    this.procedimentoSelecionado = procedimento;
    this.searchTermProcedimento = `${procedimento.nomeProcedimento} - ${procedimento.codigoProcedimento}`;
    this.sugestoesProcedimento = [];
  }

  public selecionarPrioridade(valor: string, event: any) {
    if (event.target.checked) {
      this.solicitacao.prioridade = valor;
    } 
    else {
      this.solicitacao.prioridade = '';
    }
  }



  public enviarSolicitacao() {
    this.solicitacao.idPaciente = this.pacienteSelecionado?.id ?? 0;
    this.solicitacao.idProcedimento = this.procedimentoSelecionado?.id ?? 0;
    this.solicitacao.idUnidadeSolicitante = this.usuario.idUnidadeSaude;
    this.solicitacao.idUsuarioSolicitante = this.usuario.id;
    this.solicitacao.dataSolicitacao = new Date().toISOString();
    this.solicitacao.status = 'Pendente';

    this.genericService.postDemanda(this.solicitacao).subscribe((value) => {
      if (value) {
        this.genericService.irPara(['/home']);
      }
    })
  }
}
