import { Component } from '@angular/core';
import { MatSidenavModule } from "@angular/material/sidenav";
import { GenericService } from '../../services/generic-service';
import { CommonModule } from '@angular/common';
import { UsuarioModel } from '../../models/usuario-model';
import { DemandaModel, DemandaPorEspecialidadeModel } from '../../models/demanda-model';
import { AgendamentoModel } from '../../models/agendamento-model';
import { differenceInDays } from 'date-fns';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-dashboards',
  imports: [MatSidenavModule, CommonModule],
  templateUrl: './dashboards.html',
  styleUrl: './dashboards.scss'
})
export class Dashboards {
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
  public demandaTotal: number = 0;
  public agendamentos: AgendamentoModel[] = [];
  public comparecimento: number = 0;
  public espera: number = 0;
  public demandasEspecialidade: DemandaPorEspecialidadeModel[] = [];

  constructor(
    private genericService: GenericService
  ) {}

  maxValue() {
    if (!this.demandasEspecialidade || this.demandasEspecialidade.length === 0) {
      return 1; 
    }
    return Math.max(...this.demandasEspecialidade.map(d => d.value));
  }

  ngOnInit() {
    this.buscarData();
    this.buscarUsuarioLogado();
    this.buscarDemandas();
    this.buscarAgendamentos();
    // this.buscarDemandasPorEspecialidade();
    this.genericService.getDemandaPorEspecialidade().subscribe((value) => {
      console.log("Especialidades:", value);
      this.demandasEspecialidade = value;
    });
  }

  public buscarUsuarioLogado() {
    this.genericService.getUsuarioById(Number(this.genericService.buscarIdUsuario()))
      .subscribe((value) => {
        this.usuario = value;
      });
  }

  public buscarDemandas() {
    this.genericService.getDemandas().subscribe((value) => {
      this.demandas = value;

      this.demandas.forEach(element => {
        if (element.status != "Concluído") {
          this.demandaTotal += 1;
        }
      });
    });
  }

  public buscarDemandasPorEspecialidade() {
    this.genericService.getDemandaPorEspecialidade().subscribe((value) => {
      this.demandasEspecialidade = value;
    });
  }

  public buscarAgendamentos() {
    this.genericService.getAgendamento().subscribe((value) => {
      this.agendamentos = value;

      let concluidos = 0;
      this.agendamentos.forEach(element => {
        if (element.statusComparecimento == "Concluído") {
          concluidos += 1;
        }

        const diferenca = differenceInDays(element.dataRealizacao, element.dataAgendamento);
        this.espera += diferenca;
      });

      this.comparecimento = (concluidos / this.agendamentos.length) * 100;
      this.espera /= this.agendamentos.length;
    });
  }

  public exportarPDF() {
    const elemento = document.getElementById('dashboard-pdf');

    if (!elemento) return;

    html2canvas(elemento, { scale: 3 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('relatorio-healthflow.pdf');
    });
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
