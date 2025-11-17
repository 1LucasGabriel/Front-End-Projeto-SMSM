import { Component, inject } from '@angular/core';
import { GenericService } from '../../services/generic-service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { UsuarioModel } from '../../models/usuario-model';
import { AgendamentoCompostoModel } from '../../models/agendamento-model';
import { UnidadeModel } from '../../models/unidade-model';
import { ChamarPacienteModal } from '../../modals/chamar-paciente-modal/chamar-paciente-modal';
import { MatDialog } from '@angular/material/dialog';
import { CancelarConsultaModal } from '../../modals/cancelar-consulta-modal/cancelar-consulta-modal';
import { ConcluirConsultaModal } from '../../modals/concluir-consulta-modal/concluir-consulta-modal';

@Component({
  selector: 'app-triagem',
  imports: [MatSidenavModule, CommonModule],
  templateUrl: './triagem.html',
  styleUrl: './triagem.scss'
})
export class Triagem {
  
  public usuario: UsuarioModel = {
    id: 0,
    nome: '',
    cpf: '',
    senha: '',
    idUnidadeSaude: 0,
    idPerfil: 0
  }
  public agendamentosCompostos: AgendamentoCompostoModel[] = [];
  public agendamentosFiltrados: AgendamentoCompostoModel[] = [];
  public unidade: UnidadeModel = {
    id: 0,
    nome: '',
    tipo: '',
    regiao: ''
  }

  constructor(
    private genericService: GenericService,
    private dialog: MatDialog,
    ) 
  {}

  ngOnInit() {
    this.buscarUsuarioLogado();
    this.buscarAgendamentosCompostos();
  }

  public buscarUsuarioLogado() {
    this.genericService.getUsuarioById(Number(this.genericService.buscarIdUsuario()))
      .subscribe((value) => {
        this.usuario = value;

        this.genericService.getUnidadeById(this.usuario.idUnidadeSaude).subscribe((value) => {
          this.unidade = value;
        })
      });
  }

  public buscarAgendamentosCompostos() {
    this.genericService.getAgendamentoComposto().subscribe((value) => {
      this.agendamentosCompostos = value;
      this.agendamentosFiltrados = value;
    });
  }

  public getStatusColor(status: string) {
    switch(status.toLowerCase()) {
      case 'pendente':
        return 'yellow';
      case 'em andamento':
        return 'blue';
      case 'cancelado':
        return 'red';
      default:
        return 'black';
    }
  }

  public filtrar(event: any) {
    const texto = event.target.value.toLowerCase();

    this.agendamentosFiltrados = this.agendamentosCompostos.filter(item =>
      item.pacienteNome.toLowerCase().includes(texto) ||
      item.procedimentoNome.toLowerCase().includes(texto) ||
      item.statusComparecimento.toLowerCase().includes(texto) ||
      item.dataRealizacao.toString().toLowerCase().includes(texto)
    );
  }

  public getIconColor(status: string, icon: 'chamar' | 'cancelar' | 'confirmar') {
    status = status.toLowerCase();

    if (status === 'cancelado') return '#b5b5b5';

    if (status === 'em andamento') {
      if (icon === 'chamar') return '#b5b5b5';
      if (icon === 'cancelar') return 'red';
      if (icon === 'confirmar') return 'rgb(0, 160, 13)';
    }

    switch (icon) {
      case 'chamar': return 'rgb(17, 120, 255)';
      case 'cancelar': return 'red';
      case 'confirmar': return 'rgb(0, 160, 13)';
    }
  }

  public getIconCursor(status: string) {
    status = status.toLowerCase();

    if (status === 'em andamento' || status === 'cancelado')
      return 'default'; 

    return 'pointer'; 
  }

  public chamarPacienteModal(item: AgendamentoCompostoModel) {
    this.dialog.open(ChamarPacienteModal, {
      width: '900px',
      data: item
    });
  }

  public cancelarConsultaModal(item: AgendamentoCompostoModel) {
    this.dialog.open(CancelarConsultaModal, {
      width: '900px',
      data: item
    });
  }

  public concluirAgendamentoModal(item: AgendamentoCompostoModel) {
    this.dialog.open(ConcluirConsultaModal, {
      width: '900px',
      data: item
    });
  }


  public irPara(rota: string[]) {
    this.genericService.irPara(rota);
  }

  public sair() {
    this.genericService.logout();
  }
}
