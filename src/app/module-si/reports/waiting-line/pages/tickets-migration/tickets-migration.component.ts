


import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout'
import {
  AbstractControl, FormBuilder, ValidationErrors, AsyncValidatorFn,
  FormControl, FormGroup, Validators
} from '@angular/forms';
//import {Observable} from "rxjs/Observable";

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map, Observable, Subscription } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import { TellerService } from 'src/app/services/teller.service';
import { Headquarter } from 'src/app/interfaces/headquarter';
import { HeadquarterService } from 'src/app/services/headquarter.service';

@Component({
  selector: 'app-tickets-migration',
  templateUrl: './tickets-migration.component.html',
  styleUrls: ['./tickets-migration.component.scss']
})
export class TicketsMigrationComponent implements OnInit, OnDestroy {

  cols: number = 1;

  gridByBreakpoint: GridResponsive = {
    xl: 2,
    lg: 2,
    md: 2,
    sm: 2,
    xs: 1
  }

  mediaSub!: Subscription;


  title = "Migrar Registro de Tickets"
  
  parasmTicketsMigrationBeforeUpd: ParamsTicketMigration = {
    migrateToday: false,
  };

  ticketsMigrationForm: FormGroup = this.fb.group({
    migrateToday: [''],
   
  })


  constructor(
    public mediaObserver: MediaObserver,
    private headquarterService: HeadquarterService,
    @Inject(MAT_DIALOG_DATA) public paramsDialog: { row: Headquarter, type: Number },
    private fb: FormBuilder,
    private showMessage: ShowMessageService,
    private dialogRef: MatDialogRef<TicketsMigrationComponent>,

  ) { }
  ngOnInit(): void {
    this.renderScreen()
    //this.selectCategory(this.paramsDialog.row)
    this.setDefault()
  }


  private setDefault(){
    this.ticketsMigrationForm.controls['migrateToday'].setValue(this.parasmTicketsMigrationBeforeUpd.migrateToday)
  }
  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }

  renderScreen = (): void => {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      let mqAlias: string = String(result.mqAlias);
      this.cols = this.gridByBreakpoint[mqAlias];
    })
  }

  onReturn = (category: ParamsTicketMigration): void => this.dialogRef.close(category);
  /*Prepara para guaarda y actualizar */
  addUpd() {
    this.migrate()
  }
  migrate() {
    const hq: ParamsTicketMigration = this.ticketsMigrationForm.value; 
    this.onReturn(hq);
  }
  
  /** */

}

interface GridResponsive {
  [key: string]: number
}

export interface ParamsTicketMigration{
  migrateToday:boolean
}