import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef,
MatDialogTitle } from '@angular/material/dialog';
import { DetalheDemandaModal } from '../../modals/detalhe-demanda-modal/detalhe-demanda-modal';
import { GenericService } from '../../services/generic-service';
import { UsuarioService } from '../../services/usuario.service';
import { UnidadeSaudeService } from '../../services/unidade-saude.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioModel } from '../../models/usuario-model';
import { ProcedimentoModel } from '../../models/procedimento-model';
import { UnidadeModel } from '../../models/unidade-model';
import { DemandaModel } from '../../models/demanda-model';

@Component({
  selector: 'app-lista-demandas',
  imports: [MatSidenavModule, MatFormFieldModule, MatSelectModule, MatButtonModule, FormsModule, CommonModule],
  templateUrl: './lista-demandas.html',
  styleUrl: './lista-demandas.scss'
})
export class ListaDemandas implements OnInit {

  public usuario: UsuarioModel = {
    id: 0,
    nome: '',
    cpf: '',
    senha: '',
    idUnidadeSaude: 0,
    idPerfil: 0
  }

  public procedimentos: ProcedimentoModel[] = []; 
  public unidades: UnidadeModel[] = []; 
  public demandas: DemandaModel[] = [];
  public demandasFiltradas: DemandaModel[] = [];

  public unidadeSelecionada: any = 0;

  public filtros = {
    unidade: 0,
    procedimento: 0,
    prioridade: '',
    status: ''
  };


  public data: string = '';



  constructor(private dialog: MatDialog, private genericService: GenericService) {}

  ngOnInit(): void {
    this.buscarUsuarioLogado();
    this.buscarProcedimentos();
    this.buscarUnidades();
    this.buscarDemandas();
  }

  public buscarUsuarioLogado() {
    this.genericService.getUsuarioById(Number(this.genericService.buscarIdUsuario()))
      .subscribe((value) => {
        this.usuario = value;

        this.unidadeSelecionada = this.usuario.idUnidadeSaude;
        this.filtros.unidade = this.unidadeSelecionada;

        this.aplicarFiltros();
      });
  }


  public buscarProcedimentos() {
    this.genericService.getProcedimentos().subscribe((value) => {
      this.procedimentos = value;
    })
  }

  public buscarUnidades() {
    this.genericService.getUnidades().subscribe((value) => {
      this.unidades = value;
    })
  }

  public buscarDemandas() {
    this.genericService.getDemandas().subscribe((value) => {
      this.demandas = value;
      this.aplicarFiltros();
    });
  }

  public getStatusColor(status: string) {
    switch(status.toLowerCase()) {
      case 'pendente':
        return 'yellow';
      case 'agendado':
        return 'blue';
      case 'concluído':
        return 'green';
      default:
        return 'black';
    }
  }

  public aplicarFiltros() {
    this.unidadeSelecionada = this.filtros.unidade; 

    this.demandasFiltradas = this.demandas.filter(item => {
      
      const filtroUnidade = this.filtros.unidade
        ? item.idUnidadeSolicitante === this.filtros.unidade
        : true;

      const filtroProcedimento = this.filtros.procedimento
        ? item.idProcedimento === this.filtros.procedimento
        : true;

      const filtroPrioridade = this.filtros.prioridade
        ? item.prioridade === this.filtros.prioridade
        : true;

      const filtroStatus = this.filtros.status
        ? item.status === this.filtros.status
        : true;

      return filtroUnidade && filtroProcedimento && filtroPrioridade && filtroStatus;
    });
  }

  public get nomeUnidadeSelecionada() {
    return this.unidades.find(u => u.id === this.filtros.unidade)?.nome ?? '';
  }

  public irPara(rota: string[]) {
    this.genericService.irPara(rota);
  }

  public sair() {
    this.genericService.logout();
  }
}
