


import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout'
import {
  AbstractControl, FormBuilder, ValidationErrors, AsyncValidatorFn,
  FormControl, FormGroup, Validators
} from '@angular/forms';
//import {Observable} from "rxjs/Observable";

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import { Teller } from 'src/app/interfaces/teller';
import { TellerService } from 'src/app/services/teller.service';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';





@Component({
  selector: 'app-find-user',
  templateUrl: './find-user.component.html',
  styleUrls: ['./find-user.component.scss']
})
export class FindUserComponent implements OnInit, OnDestroy {
  isLoading:boolean=false;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  usersWithPerson:User[]=[];
  userSelected?:User;

  dataSource = new MatTableDataSource<User>();


  setUserSelected(useSelected:any){
    this.userSelected=useSelected
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cols: number = 1;

  gridByBreakpoint: GridResponsive = {
    xl: 2,
    lg: 2,
    md: 2,
    sm: 2,
    xs: 1
  }

  mediaSub!: Subscription;


  title = "Establecer un usuario para esta ventanilla"
  
  constructor(
    public mediaObserver: MediaObserver,
    private userService: UserService,
    public dialogFindCategory: MatDialog,
    @Inject(MAT_DIALOG_DATA) public paramsDialog: { row: Teller, type: Number },
    private fb: FormBuilder,
    private showMessage: ShowMessageService,
    private dialogRef: MatDialogRef<FindUserComponent>,

  ) { }
  ngOnInit(): void {
    this.renderScreen()
    this.readCRUDUserWhitPeson()
    //this.selectCategory(this.paramsDialog.row)
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

  onReturn = (user: User): void => this.dialogRef.close(user);
  /*Prepara para guaarda y actualizar */
  ok() {
    if(this.userSelected)
    this.onReturn(this.userSelected)
  }
  
  readCRUDUserWhitPeson(){
    this.isLoading=true;
    this.userService.all()?.subscribe({
      next:data=>{
        this.isLoading=false;
//        this.usersWithPerson=data
        this.dataSource.data=data
        console.log(this.usersWithPerson)
      }, 
      error:error=>{
        this.isLoading=false;
        this.showMessage.error({message:error.error.message})
      }
    });
  }
}

interface GridResponsive {
  [key: string]: number
}


