import { Component, Inject, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { Cards } from 'src/app/interfaces/cards';

@Component({
  selector: 'app-edit-cards',
  templateUrl: './edit-cards.component.html',
  styleUrls: ['./edit-cards.component.scss']
})
export class EditCardsComponent implements OnInit {

  title = 'Añadir una Tarjeta';
  cardsBeforeUpd: Cards | null = null;

  constructor(
    public mediaObserver: MediaObserver,
    private fb: FormBuilder, /*es apra los formularios */
    @Inject(MAT_DIALOG_DATA) public paramsDialog: { row: Cards, type: number },
    private dialogRef: MatDialogRef<EditCardsComponent>,
  ) { }

  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      let mqAlias: string = String(result.mqAlias);
      this.cols = this.gridByBreakpoint[mqAlias];
    })

    this.setTypeDialog();
  }

  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }

  /*Para renderizar filas */
  cols: number = 1;
  gridByBreakpoint: GridResponsive = {
    xl: 2,
    lg: 2,
    md: 2,
    sm: 2,
    xs: 1
  }
  mediaSub!: Subscription;
  /**Para renderizar filas */

  /*Formulario para añadir negocio con persona */
  cardsForm: FormGroup = this.fb.group({
    cardName : ['',Validators.required],
    cardPhrases : ['',Validators.required],
    cardState : ['',Validators.required]
  });

  setTypeDialog() {

    /**verificamos que sera actualizar, de sera asi, mostramos los datos del usuario en cada campo */
    if (TYPES_ACTIONS_DIALOG.UPD == this.paramsDialog.type) {
      this.cardsBeforeUpd = this.paramsDialog.row;
      this.title = this.cardsBeforeUpd.cardName || ''

      /*redirizar informacion en el formulario*/
      this.cardsForm.get('cardName')?.setValue(this.cardsBeforeUpd.cardName)
      this.cardsForm.get('cardPhrases')?.setValue(this.cardsBeforeUpd.cardPhrases)
      this.cardsForm.get('cardState')?.setValue(this.cardsBeforeUpd.cardState?.trim())
    }
  }

  onReturn = (cards: Cards): void => this.dialogRef.close(cards);

  updCards(): boolean {
    const cards : Cards = this.cardsForm.value;
    cards.cardId = this.cardsBeforeUpd?.cardId;
    this.onReturn(cards);
    return true;
  }

  addUpdCards(): boolean{
    return (TYPES_ACTIONS_DIALOG.UPD == this.paramsDialog.type) ?
    this.updCards():
    this.addCards();
  }

  addCards(): boolean {
    const cards: Cards = this.cardsForm.value;
    this.onReturn(cards);
    return true
  }

}

interface GridResponsive {
  [key: string]: number
}
