import { Component, inject } from '@angular/core';
import { MatDialogContent, MatDialogActions, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { GenericService } from '../../services/generic-service';
import { AgendamentoCompostoModel, AgendamentoModel } from '../../models/agendamento-model';

@Component({
  selector: 'app-cancelar-consulta-modal',
  imports: [MatDialogContent, MatDialogActions],
  templateUrl: './cancelar-consulta-modal.html',
  styleUrl: './cancelar-consulta-modal.scss'
})
export class CancelarConsultaModal {
  constructor(private dialogRef: MatDialogRef<CancelarConsultaModal>, private genericService: GenericService) {}
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
    this.agendamento.statusComparecimento = "Cancelado";

    this.genericService.putAgendamento(this.agendamento.id, this.agendamento).subscribe(() => {
      this.fecharModal();
    })
  }
}
