import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { DemandaModel } from '../../models/demanda-model';

@Component({
  selector: 'app-detalhe-demanda-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './detalhe-demanda-modal.html',
  styleUrl: './detalhe-demanda-modal.scss'
})
export class DetalheDemandaModal {

  constructor(
    public dialogRef: MatDialogRef<DetalheDemandaModal>,
    @Inject(MAT_DIALOG_DATA) public data: DemandaModel
  ) {}

  fecharModal() {
    this.dialogRef.close();
    console.log("TESTE MODAL:", this.data)
  }
}
