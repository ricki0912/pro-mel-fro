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
import { Period } from 'src/app/interfaces/period';
import { PeriodPayment } from 'src/app/interfaces/period-payment';
import { Services } from 'src/app/interfaces/services';
import { Teller } from 'src/app/interfaces/teller';
import { DebtsAndPaidsService } from 'src/app/services/debts-and-paids.service';
import { PeriodPaymentService } from 'src/app/services/period-payment.service';
import { PeriodService } from 'src/app/services/period.service';
import { ServicesService } from 'src/app/services/services.service';
import { TellerService } from 'src/app/services/teller.service';
import * as fs from 'file-saver';
import { LastPayment } from 'src/app/interfaces/last-payment';
@Component({
  selector: 'app-last-payment-by-client',
  templateUrl: './last-payment-by-client.component.html',
  styleUrls: ['./last-payment-by-client.component.scss']
})
export class LastPaymentByClientComponent implements OnInit {

  /*Busqueda de servicio*/
  public listServCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public listServFilterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredListServ: ReplaySubject<Services[]> = new ReplaySubject<Services[]>(1);
  @ViewChild('singleSelect') singleSelect?: MatSelect;
  protected _onDestroy = new Subject<void>();



  /* fin de busqueda de servicio*/
   
  tellers:Teller[]=[]
  periods:Period[]=[]
  services:Services[]=[]
  periodsPayment:PeriodPayment[]=[]


  isLoading: boolean = false

  BS=BUSSINES_STATE

  t:number=0;
  bs:number = 0;
  p:number=0;
  s:number=0;
  pp:number=0;
  q:string=""



  displayedColumns: string[] = ['select', 'numArchivador','ticket','code_category' , 'category', 'date_time', 'time', 'amount'];
  dataSource = new MatTableDataSource<LastPayment>();
  selection = new SelectionModel<LastPayment>(true, []);


  clickedRows = new Set<LastPayment>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.setInitialValue();

  }
  

  constructor(
    private debtsAndPaidsService:DebtsAndPaidsService,
    private tellerService:TellerService,
    private periodsService:PeriodService,
    private servicesServices:ServicesService,
    private periodsPaymentService:PeriodPaymentService,
    private token:TokenStorageService,
    private route: ActivatedRoute,
    private router: Router,


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
  checkboxLabel(row?: LastPayment): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.bussId}`;
  }

  ngOnInit(): void {
    
    this.readTellers();
    this.readPeriods();
    this.readPeriodsPayment()
    this.readServices()
    this.onListenParams()


  
  }

  

/*Leer deudas y pagos*/
  all(tellId:number,bussState:number,prdsId:number,svId:number, ppayId:number,q:string){
    this.isLoading=true
    this.debtsAndPaidsService.getLastPaymentByClient(tellId).subscribe({
      next:(d)=>{
        
        this.dataSource.data=d.data as LastPayment[]
        this.isLoading=false
        /**Cuidado */
        this.loadDataMatSelectSearch()
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

  readPeriods(){
    this.periodsService.all().subscribe({
      next:d=>{
        this.periods=d.data as Period[]
        this.p=this.periods[0].prdsId||0
      }
    })
  }

  readServices(){
    this.servicesServices.all()?.subscribe({
      next:d=>{
        this.services = d 
      }
    })
  }

  readPeriodsPayment(){
    this.periodsPaymentService.all().subscribe({
      next: d=>{
        this.periodsPayment=d
      }
    })
  }

  /*Estate cliente */
  /*Nombre  O DNI cliente */
  /* */
  public setListenParams=() => this.router.navigate([], { queryParams: { 
    t:this.t,
    bs:this.bs,
    p:this.p,
    s:this.s,
    pp:this.pp,
    q:this.q
  }, queryParamsHandling: 'merge' });

  private onListenParams=() => this.route.queryParamMap.subscribe((params:any) => {
    let  t=0,bs=0,p=0,s=0, pp=0,q=''
    if(params.params.t){
      this.t=parseInt(params.params.t)
    }

    if(params.params.bs){
      this.bs=parseInt(params.params.bs)
    }

    if(params.params.p){
      this.p=parseInt(params.params.p)
    }
    
    if(params.params.s){
      this.s=parseInt(params.params.s)
    }

    if(params.params.pp){
      this.pp=parseInt(params.params.pp)
    }

    if(params.params.q){
      this.q=params.params.q as string
    }

    if(this.p)
      this.all(this.t,this.bs,this.p,this.s, this.pp,this.q)
  });  

  substrNameClient=(s:string)=>GlobalHelpers.subString(s,30)
  findNameTeller=(tellId:number)=>this.tellers.find(e=>e.tellId==tellId)
  findNamePeriod=(prdsId:number)=>this.periods.find(e=>e.prdsId==prdsId)
  findNameService=(svId:number)=>this.services.find(e=>e.svId==svId)
  findNamePeriodPayment=(ppayId:number)=>this.periodsPayment.find(e=>e.ppayId==ppayId)
  openDetailAppointmentInNewWindow=(bussId:number)=>  GlobalHelpers.openInNewWindow (`si/${this.token.getHqId()}/clients/${bussId}/services-provided`, this.router)





  /*filtro con busqueda */
  private loadDataMatSelectSearch(){
    this.listServCtrl.setValue(this.s);
    //this.listServCtrl.setValue(this.listServ.find(e=>e.svId==parseInt(this.sv)));

    this.filteredListServ.next(this.services.slice());


    // listen for search field value changes
    this.listServFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks();
      });
  }

  protected setInitialValue() {
    this.filteredListServ
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        if(this.singleSelect)
        this.singleSelect.compareWith = (a:number, b: number) => a=== b;

        //this.singleSelect.compareWith = (a:Services, b: Services) => a && b && a.svId === b.svId;
      });
  }

  protected filterBanks() {
    if (!this.services) {
      return;
    }
    // get the search keyword
    let search = this.listServFilterCtrl.value;
    if (!search) {
      this.filteredListServ.next(this.services.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredListServ.next(
      this.services.filter(s => (s.svName || '').toLowerCase().indexOf(search) > -1)
    );
  }

 
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  private getNameBussState(bussState:number){
    let n='';


      switch (bussState) {
          case BUSSINES_STATE.ENABLE:
            n="Activo"
          break;
          case BUSSINES_STATE.RETIRED:
              n="Retirado"
              break;
          case BUSSINES_STATE.SUSPENDED:
              n="Suspendido"
              break;
          default:
              n=""
              break;
      }
      return n;

  }

  /*Funciones adicionales */
exportExcel(){
  
  let workbook = new Workbook();
  let worksheet = workbook.addWorksheet("Deudas y Pagos - Filtro");

  //CONVIRTIENDO NUESTRO ARREGLO A UN FORMATO LEGIBLE PARA EXCEL USANDO EXCELJS
  worksheet.addRow(undefined);
  for (let x1 of this.dataSource.data){
      let x2=Object.keys(x1);


      

      let temp=[]
      temp.push(x1.bussFileNumber)
      temp.push(x1.bussRUC)
      temp.push(x1.bussName)
      temp.push(this.getNameBussState(parseInt(x1.bussState)))
      temp.push((x1.tellId)?this.findNameTeller(x1.tellId)?.tellName:null)
      temp.push((x1.prdsId)?this.findNamePeriod(x1.prdsId)?.prdsNameShort:null)
      temp.push((x1.svId)?this.findNameService(x1.svId)?.svName:null)
      temp.push((x1.ppayId)?this.findNamePeriodPayment(x1.ppayId)?.ppayName:null)
      temp.push(x1.spCost)
      temp.push(x1.spPaid)
      temp.push(x1.spDebt)

      /*for(let y of x1.){
        temp.push(y)
      }*/
      worksheet.addRow(temp)
  }
  //NOMBRE DEL ARCHIVO RESULTANTE
  let fname="Deudas y Pagos";

  //ASIGNACIÓN DE LA CABECERA DEL DOCUMENTO EXCEL DONDE CADA CAMPO DE LOS DATOS QUE EXPORTAREMOS SERA UNA COLUMNA
  worksheet.columns = [
      { header: 'ARCHIVADOR', key: 'col1', width: 10},
      { header: 'RUC', key: 'col2', width: 30},
      { header: 'NOMBRE', key: 'col3', width: 15},
      { header: 'ESTADO CLIENTE', key: 'col3', width: 15},
      { header: 'VENTANILLA ['+((this.t)?(this.findNameTeller(this.t)?.tellName):'Todos')+']', key: 'col4', width: 20},
      { header: 'PERIODO ['+((this.p)?this.findNamePeriod(this.p)?.prdsNameShort:'Todos')+']', key: 'col5', width: 20},
      { header: 'SERVICIO ['+((this.s)?this.findNameService(this.s)?.svName:'Todos')+']', key: 'col6', width: 50},
      { header: 'MES/SUBPERIODO ['+((this.pp)?this.findNamePeriodPayment(this.pp)?.ppayName:'Todos')+']', key: 'col7', width: 20},
      { header: 'COSTO', key: 'col8', width: 20},
      { header: 'PAGADO', key: 'col9', width: 20},
      { header: 'DEUDA', key: 'col10', width: 20}
  ]as any;

  //PREPACION DEL ARCHIVO Y SU DESCARGA
  workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname+'.xlsx');
  });

}

formatDate=(d:Date)=>GlobalHelpers.formatDate(d)

}
