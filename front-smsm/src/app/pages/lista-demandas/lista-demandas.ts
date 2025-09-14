import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef,
MatDialogTitle } from '@angular/material/dialog';
import { DetalheDemandaModal } from '../../modals/detalhe-demanda-modal/detalhe-demanda-modal';
import { GenericService } from '../../services/generic-service';

@Component({
  selector: 'app-lista-demandas',
  imports: [MatSidenavModule, MatFormFieldModule, MatSelectModule, MatButtonModule],
  templateUrl: './lista-demandas.html',
  styleUrl: './lista-demandas.scss'
})
export class ListaDemandas {

  public data: string = '';
  readonly dialog = inject(MatDialog);

  constructor(
    private genericService: GenericService
  ) {}

  ngOnInit() {
    this.buscarData();
  }

  public openDialog() {
    const dialogRef = this.dialog.open(DetalheDemandaModal, {
      width: '900px',
      maxWidth: '95vw',
      height: 'auto',
      maxHeight: '90vh'
    });
  }

  public irPara(rota: string[]) {
    this.genericService.irPara(rota);
  }

  public buscarData() {
    this.data = this.genericService.buscarData('Marília');
  }
}
