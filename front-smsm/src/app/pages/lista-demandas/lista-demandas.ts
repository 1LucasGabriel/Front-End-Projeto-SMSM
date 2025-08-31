import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef,
MatDialogTitle } from '@angular/material/dialog';
import { DetalheDemandaModal } from '../../modals/detalhe-demanda-modal/detalhe-demanda-modal';

@Component({
  selector: 'app-lista-demandas',
  imports: [MatSidenavModule, MatFormFieldModule, MatSelectModule, MatButtonModule],
  templateUrl: './lista-demandas.html',
  styleUrl: './lista-demandas.scss'
})
export class ListaDemandas {

  readonly dialog = inject(MatDialog);

  public openDialog(): void {
    const dialogRef = this.dialog.open(DetalheDemandaModal, {
    });
  }
}
