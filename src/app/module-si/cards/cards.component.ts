import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionDialogInterface, TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { CrudInterface } from 'src/app/global/interfaces/crud.interface';
import { Cards } from 'src/app/interfaces/cards';
import { CardsService } from 'src/app/services/cards.service';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import { EditCardsComponent } from './pages/edit-cards/edit-cards.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit, CrudInterface, ActionDialogInterface {
  isLoading = true;
  cards: Cards[]=[];

  constructor(
    public dialogEditCard: MatDialog,
    private cardsService: CardsService,
    private showMessage: ShowMessageService
  ) { }

  ngOnInit(): void {
    this.readCRUD();
    console.log("holaaaaaaaa"+this.cards);

  }

  //cards:Cards[] = [{cardName: "tarjeta 1", cardPhrases: "Hola mundo"},{cardName: "trajeta 2", cardPhrases:"hola perro"}];

  createCRUD(): boolean {
    throw new Error('Method not implemented.');
  }
  readCRUD(): boolean {
    this.isLoading=true;
    this.cardsService.all().subscribe({
      next: d=>{
        this.cards=d
        this.isLoading=false
      },
      error: e=>{
        this.showMessage.error({message: e.error.message})
      }
    })
    return true;
  }
  updateCRUD(object: any, id: string | number | null): boolean {
    throw new Error('Method not implemented.');
  }
  deleteCRUD(ids: string | number | string[] | number[] | null): boolean {
    throw new Error('Method not implemented.');
  }

  openDialogAdd(): boolean {
    const dialogRef = this.dialogEditCard.open(EditCardsComponent, {
      panelClass: 'dialog',
      data: {
        row: {},
        type: TYPES_ACTIONS_DIALOG.ADD
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addCards(result);
      }
    });
    return true
  }
  openDialogUpd(object: any): boolean {
    throw new Error('Method not implemented.');
  }
  openDialogdAddAndUpd(object: any): boolean {
    throw new Error('Method not implemented.');
  }

  //FUNCIONES
  addCards(cards: Cards): boolean {
    this.cardsService.addCards(cards).subscribe({
      next: data => {
        const cards = data.data as Cards[];
        this.cards.unshift(...cards);
        this.showMessage.success({ message: data.msg });
      },
      error: error => {
        this.showMessage.error({ message: error.error.message, action: () => this.addCards(cards) })
      }
    });
    return true;
  }

}

