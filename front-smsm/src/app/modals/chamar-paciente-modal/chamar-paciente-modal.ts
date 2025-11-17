import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogContent, MatDialogActions, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { AgendamentoCompostoModel, AgendamentoModel } from '../../models/agendamento-model';
import { GenericService } from '../../services/generic-service';

@Component({
  selector: 'app-chamar-paciente-modal',
  imports: [MatDialogContent, MatDialogActions, FormsModule],
  templateUrl: './chamar-paciente-modal.html',
  styleUrl: './chamar-paciente-modal.scss'
})
export class ChamarPacienteModal {
  constructor(private dialogRef: MatDialogRef<ChamarPacienteModal>, private genericService: GenericService) {}
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
    this.agendamento.statusComparecimento = "Em andamento";

    this.genericService.putAgendamento(this.agendamento.id, this.agendamento).subscribe(() => {
      this.fecharModal();
    })
  }
}
