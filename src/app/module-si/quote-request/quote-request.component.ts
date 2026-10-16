
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Workbook } from 'exceljs';
import { ReplaySubject, Subject, take, takeUntil } from 'rxjs';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { GlobalHelpers } from 'src/app/global/helpers/global.helpers';
import { BUSSINES_STATE } from 'src/app/interfaces/bussines';
import { DebtsAndPaids } from 'src/app/interfaces/debts-and-paids';
import { Services } from 'src/app/interfaces/services';
import { Teller } from 'src/app/interfaces/teller';
import { DebtsAndPaidsService } from 'src/app/services/debts-and-paids.service';
import { TellerService } from 'src/app/services/teller.service';
import * as fs from 'file-saver';
import { PMS } from 'src/app/core/permission/pms.enum';
import { QUOTE_REQUESTS_STATE, QuoteRequest } from 'src/app/interfaces/quote-request';
import { QuoteRequestService } from 'src/app/services/quote-request.service';
import { CommentQuoteRequestComponent } from './pages/comment-call/comment-quote-request.component';
import { TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-quote-request',
  templateUrl: './quote-request.component.html',
  styleUrls: ['./quote-request.component.scss']
})
export class QuoteRequestComponent implements OnInit {

  /*Busqueda de servicio*/
  public listServCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public listServFilterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  @ViewChild('singleSelect') singleSelect?: MatSelect;
  protected _onDestroy = new Subject<void>();



  /* fin de busqueda de servicio*/
   
  tellers:Teller[]=[]


  isLoading: boolean = false

  BS=BUSSINES_STATE
  
  QRS=QUOTE_REQUESTS_STATE

  /*Parametros para buscar */
  //dateStart:Date=new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-7)
  //dateEnd:Date=new Date()

  PMS=PMS

  t:number=0;
  qrs:number=0;
  //bs:number = 0;
  ds:Date=new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-7)
  de:Date=new Date()
  q:string=""



  displayedColumns: string[] = ['select','quoteReqRegDate','quoteReqFullName', 'quoteReqMobilePhone' ,'quoteReqServiceInterest', 'quoteReqMonthlyInvoices', 'quoteReqMessage', 'quoteReqState', 'quoteAssignedToTellId','quoteReqComment','actions'];
  dataSource = new MatTableDataSource<QuoteRequest>();
  selection = new SelectionModel<QuoteRequest>(true, []);


  clickedRows = new Set<DebtsAndPaids>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    //this.onListenParams()
  }
  

  constructor(
    private quoteRequestService:QuoteRequestService,
    private tellerService:TellerService,
    private token:TokenStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog, 
    


  ) { }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: QuoteRequest): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.quoteReqId}`;
  }

  ngOnInit(): void {
    
    this.readTellers();
    this.onListenParams();


  
  }

  

/*Leer deudas y pagos*/
  all(tellId:number, quoteReqState:number,quoteReqRegDateStart:Date, quoteReqRegDateEnd:Date,q:string){
    this.isLoading=true
    this.quoteRequestService.all(tellId,quoteReqState,quoteReqRegDateStart,quoteReqRegDateEnd,q).subscribe({
      next:(d)=>{
        
        this.dataSource.data=d.data as QuoteRequest[]
        this.isLoading=false
        /**Cuidado */
      }
    })
  }

  /*Leer tablas independientes para filtro */

  readTellers(){
    this.tellerService.allByHQ(this.token.getHqId()).subscribe({
      next:d=>{
        this.tellers=d
      }
    })
  }




 

  /*Estate cliente */
  /*Nombre  O DNI cliente */
  /* */
  public setListenParams=() => this.router.navigate([], { queryParams: { 
    t:this.t,
    qrs:this.qrs,
    ds:this.ds,
    de:this.de,
    q:this.q
  }, queryParamsHandling: 'merge' });

  private onListenParams=() => this.route.queryParamMap.subscribe((params:any) => {
    if(params.params.t){
      this.t=parseInt(params.params.t)
    }

    if(params.params.qrs){
      this.qrs=parseInt(params.params.qrs)
    }

    if(params.params.ds){
      this.ds=new Date(params.params.ds)
    }

    if(params.params.de){
      this.de=new Date(params.params.de)
    }

  

    if(params.params.q){
      this.q=params.params.q as string
    }

    //if(this.p)
      this.all(this.t,this.qrs,this.ds,this.de, this.q)
  });  

  substrNameClient=(s:string)=>GlobalHelpers.subString(s,30)
  findNameTeller=(tellId:number)=>this.tellers.find(e=>e.tellId==tellId)
  openDetailAppointmentInNewWindow=(bussId:number)=>  GlobalHelpers.openInNewWindow (`si/${this.token.getHqId()}/clients/${bussId}/services-provided`, this.router)



  openDialogAddCommentQuoteRequest(quoteRequest: QuoteRequest, tellers: Teller[]): boolean {
    const dialogRef = this.dialog.open(CommentQuoteRequestComponent, {
      panelClass: 'dialog',
      data: {
        row: {quoteRequest, tellers},
        type: TYPES_ACTIONS_DIALOG.ADD
      }
    });

    dialogRef.afterClosed().subscribe((result: QuoteRequest) => {
      if(result){
        quoteRequest=result;
      }
    });
    return false;
  }


  /*filtro con busqueda */
 
 

 

 
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  markAsCompleted(quoteReqId:QuoteRequest){
    this.openDialogAddCommentQuoteRequest(quoteReqId, this.tellers)
  }


}
