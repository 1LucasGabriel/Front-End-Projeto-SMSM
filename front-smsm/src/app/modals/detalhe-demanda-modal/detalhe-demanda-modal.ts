import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-detalhe-demanda-modal',
  imports: [],
  templateUrl: './detalhe-demanda-modal.html',
  styleUrl: './detalhe-demanda-modal.scss'
})
export class DetalheDemandaModal {
  constructor(
    private dialogRef: MatDialogRef<DetalheDemandaModal>
  ) {
  }

  public fecharModal() {
    this.dialogRef.close();
  }
}
