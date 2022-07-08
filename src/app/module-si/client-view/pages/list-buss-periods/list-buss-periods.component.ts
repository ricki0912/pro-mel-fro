import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Period } from 'src/app/interfaces/period';
import { PeriodPayment } from 'src/app/interfaces/period-payment';
import { Services } from 'src/app/interfaces/services';
import { ServicesProvided, TServicesProvided } from 'src/app/interfaces/services-provided';
import { AppointmentTempService } from 'src/app/services/appointment-temp.service';
import { BussinesService } from 'src/app/services/bussines.service';
import { PeriodPaymentService } from 'src/app/services/period-payment.service';
import { ServicesProvidedService } from 'src/app/services/services-provided.service';
import { ServicesService } from 'src/app/services/services.service';
import { LoadingService } from 'src/app/shared/components/loading/loading.service';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import {Bussines} from 'src/app/interfaces/bussines'
import {AppointmentTemp} from 'src/app/interfaces/appointment-temp'
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { User } from 'src/app/interfaces/user';
import {ProofOfPaymentComponent} from 'src/app/module-si/accounting/pages/proof-of-payment/proof-of-payment.component'
import { MatDialog } from '@angular/material/dialog';
import { ClientViewService } from '../../client-view.service';
import { DialogConfirmationComponent } from 'src/app/shared/components/dialog-confirmation/dialog-confirmation.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-buss-periods',
  templateUrl: './list-buss-periods.component.html',
  styleUrls: ['./list-buss-periods.component.scss']
})
export class ListBussPeriodsComponent implements OnInit {

  @Input() bp: Period = {};
  @Input() serBuss?:Bussines
  public services: Services[] = [];
  public periodPayments:PeriodPayment[]=[];
  private currentUser: User;


  /*Variables adicionales */
  private business?:Bussines
  private appointmentTemp?:AppointmentTemp
  constructor(
    private spService: ServicesProvidedService,
    private showMessage: ShowMessageService,
    private loadingService:LoadingService,
    private servicesService: ServicesService,
    private periodPaymentService: PeriodPaymentService,
    private businessServices:BussinesService,
    private appointmentTempService:AppointmentTempService,

    private tokenStorage: TokenStorageService,
    private dialog:MatDialog,
    private clientViewService:ClientViewService,
    private serviceService: ServicesService,


    //private services:ServicesProvided
  ) {

    this.currentUser=this.tokenStorage.getUser() as User
  }

  private listenSelectedBusiness(o:()=>void){
    this.clientViewService.getSelectedBussines().subscribe((b:Bussines | null)=>{
      if(b)
        this.business=b;
    })
  }
  ngOnInit(): void {
    this.readServices();
    this.readPeriodPayments()
    this.readServiceProvidedsByDBP(this.bp.dbp?.dbpId || -1)
    this.listenSelectedBusiness(()=>{})
    /*Optimizar esta parte para que no consuma mucho recursos
     */


    const telleId=this.tokenStorage.getTeller()?.tellId

    if(telleId)
    this.readCRUDCurrentAppointment(telleId)
  }

  //displayedColumns: string[] = ['select', 'service', 'period', 'amount', 'debt', 'paid', 'state', 'LimitPayment', 'comment', 'actions'];

//  displayedColumns: string[] = ['select', 'service', 'period', 'amount', 'state', 'LimitPayment', 'comment', 'actions'];
displayedColumns: string[] = ['select', 'service', 'period', 'amount', 'comment', 'actions'];

  //servicesProvided = [...ELEMENT_DATA];
  servicesProvided:ServicesProvided[] = [];

  dataSource = new MatTableDataSource<ServicesProvided>(this.servicesProvided);
  selection = new SelectionModel<ServicesProvided>(true, []);

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
  checkboxLabel(row?: ServicesProvided): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${(row.spId || -1) + 1}`;
  }

  //FUNCIONES
  prepareBeforeGenerateProof(){
    if(!this.business){
      this.showMessage.error({message:'Cliente vació'})
      return;
    }
    if(!this.selection.selected){
      this.showMessage.error({message:'Seleccione más de un servicio.'})
      return;
    }
    if(!this.appointmentTemp){
      this.showMessage.error({message:'Tiene que sacar su ticket de atención para poder realizar un pago.'})
      return;
    }


    this.openDialogEmitProofOfPayment()

  }


  openDialogEmitProofOfPayment() {
    const dialogRef = this.dialog.open(ProofOfPaymentComponent, {
      panelClass: 'dialog',
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: {
        row: null,
        appointmentTemp:this.appointmentTemp,
        payLinkBuss:true,
        bussines: this.business,
        servicesProvideds:this.selection.selected,
        type: 1
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.readServiceProvidedsByDBP(this.bp.dbp?.dbpId || -1)

        //this.transferCallToTeller(this.tAppointmentTemp?.apptmId || -1, result.tellId || -1)

        /*const apptmIds:number[]= this.selection.selected.reduce(( p:number[], c:TAppointmentTemp)=>[...p, c.apptmId || -1], [])
        this.updateTeller(apptmIds, result.tellId || -1)*/
      }
    });
  }
  addData(){
    //const randomElementIndex = Math.floor(Math.random() * this.servicesProvided.length);
    //this.servicesProvided = [...this.servicesProvided, this.servicesProvided[randomElementIndex]];
    //this.dataSource.setData(this.servicesProvided);
    //const p: ServicesProvided={service: 1, period: 1, amount: 20.00, date: '20/02/2022', voucher:'Boleta', numVoucher:0, state:'pagado', comment:'g'};
    const p: ServicesProvided={dbpId:this.bp.dbp?.dbpId, spState:1, spCost:0.0, spDebt:0.0, spPaid:0.0};
    this.dataSource.data.push(p);
    this.dataSource.data = this.dataSource.data.slice();
  }
  removeData(){
    //this.servicesProvided = this.servicesProvided.slice(0, -1);
    //this.dataSource.setData(this.servicesProvided);
    const d = this.dataSource.data;


    /*if(d[d.length-1].name == 'Neon'){
      return
    }*/
    this.dataSource.data = this.dataSource.data.slice(0,-1);
  }

  /*Actualizar todos los datos de los servicios*/
  updSv(el: TServicesProvided, sv: sv) {
    if (sv == null) { return; }
    //el.service = Number(sv.name);
    el.svId = Number(sv.name);
    el.spEditable=true
    this.dataSource.data = this.dataSource.data;
  }

  updPd(el: TServicesProvided, pd: pd) {
    console.log("UPD PERIODOS ROW", pd)
    if (pd == null) { return; }

    el.ppayId = Number(pd.period);
    el.spEditable=true;
    this.dataSource.data = this.dataSource.data;
  }

  updMt(el: TServicesProvided, amount: number) {
    if (amount == null) { return; }
    //el.amount = amount;
      el.spCost = amount;
      el.spEditable=true;
    this.dataSource.data = this.dataSource.data;
  }

  update(el: TServicesProvided, comment: string) {
    if (comment == null) { return; }
    //el.comment = comment;
    el.spComment = comment;
    el.spEditable=true;
    this.dataSource.data = this.dataSource.data;
  }

  prepareAdd(el: TServicesProvided,indexRow:number){
    const sp: ServicesProvided = {};
    sp.dbpId = this.bp.dbp?.dbpId;
    sp.svId = el.svId;
    sp.ppayId = el.ppayId;
    sp.spCost = el.spCost;
    sp.spComment = el.spComment;
    sp.spId=el.spId

    if(sp.spId && sp.spId>0){
      this.updServices(sp.spId, sp,indexRow)
    }else {
      this.addServices(sp, indexRow);
    }

  }

  addServices(sp: TServicesProvided,indexRow:number): boolean{
    this.loadingService.show();

    this.spService.addServicesProvided(sp).subscribe({
      next: data => {
        console.log("response",data)
        this.showMessage.success({ message: data.msg });
        const servPro = data.data as ServicesProvided[];

        //this.dataSource.data.unshift(...servPro);
        this.dataSource.data[indexRow] = servPro[0]
        this.dataSource.data=this.dataSource.data
        //this.paginator._changePageSize(this.paginator.pageSize);
        this.loadingService.hide();
      },
      error: error => {
        this.loadingService.hide()
        this.showMessage.error({ message: error.error.message, action: () => this.addServices(sp,indexRow) })
      }
    });
    return true;
  }

  updServices(spId:number,sp:ServicesProvided,indexRow:number){
    this.loadingService.show()
    this.spService.upd(spId, sp).subscribe({
      next:d=>{
        this.showMessage.success({ message: d.msg });
        const servPro = d.data as ServicesProvided[];

        //this.dataSource.data.unshift(...servPro);
        this.dataSource.data[indexRow] = servPro[0]
        this.dataSource.data=this.dataSource.data
        this.loadingService.hide()
      },
      error:e=>{
        this.loadingService.hide()
        this.showMessage.error({message:e.error.message})
      }
    })

  }

  findSubPeriod(so: number){
    return this.periodPayments.find(o=>(o.ppayId ||-1)==so);
  }

  findServices(fs: number){
    return this.services.find(o=>o.svId==fs);
  }


  readServices(){
    this.servicesService.all()?.subscribe({
      next:d=>{
        this.services = d;
      }
    })
  }
  readPeriodPayments(){
    this.periodPaymentService.all().subscribe({
      next:d=>{
        this.periodPayments=d
      },
      error:e=>{

      }
    })
  }
  readServiceProvidedsByDBP(dbpId:number){
    this.spService.allByDBP(dbpId).subscribe({
      next: d=>{
        this.servicesProvided=d.data as TServicesProvided[]
        this.dataSource.data=this.servicesProvided
        this.selection.clear();
      },
    error:  e=>{
        this.showMessage.error({message: e.error.message})
      }
    })
  }



  readCRUDCurrentAppointment(tellId:number){
    this.appointmentTempService.getAttentionPendingByTeller(tellId)
      .subscribe({
        next:d=>{
          const a=d.data as AppointmentTemp[]
          this.appointmentTemp =a[0]
        }, error:e=>{
          this.showMessage.error({message: e.error.message})
        }
      })
  }


  calcWidth(firstNumber?:number, totalNumber?:number):number{
    return ((firstNumber|| 0)/( totalNumber ||0))*100
  }
  getTotalToPay(){
    return this.selection.selected.map(t => t.spDebt).reduce((acc, value?:number) => (acc || 0) +(Number(value) || 0), 0);

  }


  beforeDelete(id:number){
    this.wantDelete(()=>this.deleteCRUD(id))
  }
  wantDelete(d:()=>void){
    this.dialog
      .open(DialogConfirmationComponent, {
        data: `Esta seguro que desea eliminar.`,
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          d();
        } else {

        }
      });
  }
  deleteCRUD(id: number): boolean {
    this.spService.del(id).subscribe({
      next: data=>{
        this.showMessage.success({message: data.msg});
        this.readServiceProvidedsByDBP(this.bp.dbp?.dbpId || -1);
      },
      error: error=>{
        this.showMessage.error({message: error.error.message})
      }
    })
    return true;
  }

  printReportPeriod(){
    console.log("datos", this.bp.prdsId, this.serBuss?.bussId);
    window.open(environment.API_URL+"/v1/reports/"+this.bp.prdsId+"/exercise-monitoring/"+this.serBuss?.bussId);
  }




  /*subperiod: SubPeriodo[] = [
    {value: '1', name: 'Enero'},
    {value: '2', name: 'Febrero'},
    {value: '3', name: 'Marzo'},
    {value: '4', name: 'Abril'},
    {value: '5', name: 'Mayo'},
    {value: '6', name: 'Junio'},
    {value: '7', name: 'Julio'},
    {value: '8', name: 'Agosto'},
    {value: '9', name: 'Setiembre'},
    {value: '10', name: 'Octubre'},
    {value: '11', name: 'Noviembre'},
    {value: '12', name: 'Diciembre'},
  ];
*/
}

/*export interface PeriodicElement {
  service: number;
  period: number;
  amount: number;
  date: string;
  voucher: string;
  numVoucher: number;
  state: string;
  comment: string;
}*/

export interface sv {
  name : string;
}

export interface pd {
  period : string;
}

/*const ELEMENT_DATA: PeriodicElement[] = [
  {service: 1, period: 1, amount: 1.00, date: '27/04/2022', voucher:'boleta', numVoucher: 1, state:'pagado', comment:'h'},
  {service: 2, period: 3, amount: 4.00, date: '27/04/2022', voucher:'factura', numVoucher: 10, state:'pagado', comment:'h'},
  {service: 3, period: 5, amount: 6.97, date: '27/04/2022',voucher:'boleta', numVoucher: 12, state:'Pendiente', comment:'h'},
  {service: 4, period: 12, amount: 9.01, date: '27/04/2022', voucher:'boleta', numVoucher: 234, state:'pagado', comment:'h'},
  {service: 5, period: 8, amount: 10.81, date: '27/04/2022', voucher:'ticket', numVoucher: 3, state:'pagado', comment:'h'},
];*/

/*interface SubPeriodo {
value: string;
name: string;
}*/


