

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionDialogInterface, TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { CrudInterface } from 'src/app/global/interfaces/crud.interface';
import { Cards } from 'src/app/interfaces/cards';
import { CardsService } from 'src/app/services/cards.service';
import { DialogConfirmationComponent } from 'src/app/shared/components/dialog-confirmation/dialog-confirmation.component';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {

 @Input() card: Cards = {};
  @Output() onDel = new EventEmitter<Cards>();
  constructor(
    public dialogEditCard: MatDialog,
    public cardsService: CardsService,
    private showMessage: ShowMessageService
  ) { }

  ngOnInit(): void {
  }

  openDialogAdd(object: any): boolean {
    throw new Error('Method not implemented.');
  }
  openDialogUpd(data: Cards): boolean {
    
    return false;
  }
  openDialogdAddAndUpd(object: any): boolean {
    throw new Error('Method not implemented.');
  }

  createCRUD(object: any): boolean {
    throw new Error('Method not implemented.');
  }
  readCRUD(): boolean {
    throw new Error('Method not implemented.');
  }
  updateCRUD(object: Cards): boolean {
    this.cardsService.updCards(object).subscribe({
      next: data=>{
        const cards=data.data as Cards[]
        this.card=cards[0];
        this.showMessage.success({message: data.msg})
      },
      error: error=>{
        this.showMessage.error({message: error.error.message, action:()=>this.updateCRUD(object)})
      }
    })

    return true;
  }
  deleteCRUD(id: number[]): boolean {
    this.cardsService.delCards(id).subscribe({
      next: data=>{
        this.showMessage.success({message: data.msg});
        this.onDel.emit(this.card);
      },
      error: error=>{
        this.showMessage.error({message: error.error.message})
      }
    })
    return true;
  }

  delCards(data: Cards){
    let ids: number[] = [data.cardId || -1];
    this.wantDelete(()=>this.deleteCRUD(ids))
  }

  wantDelete(d:()=>void){
    this.dialogEditCard
      .open(DialogConfirmationComponent, {
        data: `Esta seguro que desea Eliminar.`,
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          d();
        } else {

        }
      });
  }

  enableDisableCards(state: Cards):boolean{
    let ids: number[] = [state.cardId || -1];
    this.cardsService.enableDisableCards(ids).subscribe({
      next: data=>{
        this.showMessage.success({message: data.msg});
        this.onDel.emit(this.card);
      },
      error: error=>{
        this.showMessage.error({message: error.error.message})
      }
    })
    return true;
  }
}
