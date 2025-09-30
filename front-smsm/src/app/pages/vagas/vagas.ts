import { Component } from '@angular/core';
import { MatSidenavModule } from "@angular/material/sidenav";
import { GenericService } from '../../services/generic-service';
import {CdkDrag, CdkDragDrop, CdkDropList, copyArrayItem, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { DetalheDemandaModal } from '../../modals/detalhe-demanda-modal/detalhe-demanda-modal';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-vagas',
  imports: [MatSidenavModule, CommonModule],
  templateUrl: './vagas.html',
  styleUrl: './vagas.scss'
})
export class Vagas {
  public data: string = '';

  constructor(
    private genericService: GenericService,
    private dialog: MatDialog,
    ) 
    {
  }

  public irPara(rota: string[]) {
    this.genericService.irPara(rota);
  }

  public buscarData() {
    this.data = this.genericService.buscarData('Marília');
  }

  public openDialog(demanda: any) {
    this.dialog.open(DetalheDemandaModal, {
      width: '900px',
      data: demanda
    });
  }

  
}
