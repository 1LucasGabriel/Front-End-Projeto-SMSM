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

@Component({
  selector: 'app-lista-demandas',
  imports: [MatSidenavModule, MatFormFieldModule, MatSelectModule, MatButtonModule, FormsModule, CommonModule],
  templateUrl: './lista-demandas.html',
  styleUrl: './lista-demandas.scss'
})
export class ListaDemandas implements OnInit {

  public dataAtual: string = '';
  public usuario: any = { id: 1, nome: 'Lucas Gabriel', unidadeId: 1 }; 
  public unidades: any[] = []; 
  public procedimentos: any[] = []; 
  public demandas: any[] = [];
  public demandasFiltradas: any[] = [];

  public data: string = '';


  public filtroUnidade: number | null = null;
  public filtroProcedimento: number | null = null;
  public filtroStatus: string = '';
  public filtroPrioridade: string = '';



  constructor(private dialog: MatDialog, private genericService: GenericService) {}

  ngOnInit(): void {
    this.carregarMocks();
    this.dataAtual = new Date().toLocaleDateString();
    this.aplicarFiltros();
  }


  public openDialog(demanda: any) {
    this.dialog.open(DetalheDemandaModal, {
      width: '900px',
      data: demanda
    });
  }

  public aplicarFiltros() {
    this.demandasFiltradas = this.demandas
      .filter(d => d.idUsuarioSolicitante === this.usuario.id)
      .filter(d => !this.filtroUnidade || d.idUnidadeSolicitante === this.filtroUnidade)
      .filter(d => !this.filtroProcedimento || d.idProcedimento === this.filtroProcedimento)
      .filter(d => !this.filtroStatus || d.status === this.filtroStatus)
      .filter(d => !this.filtroPrioridade || d.prioridade === this.filtroPrioridade);
  }


  private carregarMocks() {
    this.unidades = [
      { id: 1, nome: 'UBS Alto Cafezal', tipo: 'UBS', regiao: 'Zona Norte' },
      { id: 2, nome: 'UBS São Judas', tipo: 'UBS', regiao: 'Zona Sul' },
      { id: 3, nome: 'UBS Castelo Branco', tipo: 'UBS', regiao: 'Zona Oeste' },
      { id: 4, nome: 'UPA Zona Norte', tipo: 'UPA', regiao: 'Zona Norte' },
      { id: 5, nome: 'UPA Zona Sul', tipo: 'UPA', regiao: 'Zona Sul' },
    ];

    this.procedimentos = [
      { id: 1, nomeProcedimento: 'Eletrocardiograma' },
      { id: 2, nomeProcedimento: 'Tratamento de Acne' },
      { id: 3, nomeProcedimento: 'Consulta Neurológica' },
      { id: 4, nomeProcedimento: 'Artroscopia de Joelho' },
      { id: 5, nomeProcedimento: 'Vacinação Infantil' },
    ];

    this.demandas = [
      { id: 1, idPaciente: 'Lucas Santos', idProcedimento: 1, idUnidadeSolicitante: 1, idUsuarioSolicitante: 1, dataSolicitacao: '2025-09-29', prioridade: 'Alta', status: 'Pendente' },
      { id: 2, idPaciente: 'José Monteiro', idProcedimento: 2, idUnidadeSolicitante: 2, idUsuarioSolicitante: 1, dataSolicitacao: '2025-09-28', prioridade: 'Média', status: 'Pendente' },
      { id: 3, idPaciente: 'Carlos Almeida', idProcedimento: 3, idUnidadeSolicitante: 3, idUsuarioSolicitante: 1, dataSolicitacao: '2025-09-27', prioridade: 'Alta', status: 'Em andamento' },
      { id: 4, idPaciente: 'Julia Marinho', idProcedimento: 4, idUnidadeSolicitante: 4, idUsuarioSolicitante: 1, dataSolicitacao: '2025-09-26', prioridade: 'Urgente', status: 'Pendente' },
      { id: 5, idPaciente: 'Victor Gaspareto', idProcedimento: 5, idUnidadeSolicitante: 1, idUsuarioSolicitante: 1, dataSolicitacao: '2025-09-25', prioridade: 'Média', status: 'Concluída' },
    ];
  }

  public irPara(rota: string[]) {
    this.genericService.irPara(rota);
  }

  public buscarData() {
    this.data = this.genericService.buscarData('Marília');
  }

  public onFiltroChange() {
    this.aplicarFiltros();
  }
}
