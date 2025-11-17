import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from "@angular/material/dialog";
import { GenericService } from '../../services/generic-service';
import { AgendamentoCompostoModel, AgendamentoModel } from '../../models/agendamento-model';

@Component({
  selector: 'app-concluir-consulta-modal',
  imports: [MatDialogActions, MatDialogContent],
  templateUrl: './concluir-consulta-modal.html',
  styleUrl: './concluir-consulta-modal.scss'
})
export class ConcluirConsultaModal {
  constructor(private dialogRef: MatDialogRef<ConcluirConsultaModal>, private genericService: GenericService) {}
  readonly item = inject<AgendamentoCompostoModel>(MAT_DIALOG_DATA);
  public agendamento: AgendamentoModel = {
    id: 0,
    idDemanda: 0,
    idVaga: 0,
    idUsuarioRegulador: 0,
    dataAgendamento: '',
    dataRealizacao: '',
    statusComparecimento: ''
  }

  public fecharModal() {
    this.dialogRef.close();
  }

  public atualizarAgendamento() {
    this.agendamento = this.item;
    this.agendamento.statusComparecimento = "Concluído";

    this.genericService.putAgendamento(this.agendamento.id, this.agendamento).subscribe(() => {
      this.fecharModal();
    })
  }
}
