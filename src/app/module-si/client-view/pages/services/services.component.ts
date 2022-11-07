import { Component, Input, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { CrudInterface } from 'src/app/global/interfaces/crud.interface';
import { Bussines } from 'src/app/interfaces/bussines';
import { DBusinessPeriod } from 'src/app/interfaces/d-business-period';
import { Period } from 'src/app/interfaces/period';
import { Services } from 'src/app/interfaces/services';
import { TServicesProvided } from 'src/app/interfaces/services-provided';
import { FindPeriodComponent } from 'src/app/module-si/period/pages/find-period/find-period.component';
import { BussinesService } from 'src/app/services/bussines.service';
import { PeriodService } from 'src/app/services/period.service';
import { ServicesService } from 'src/app/services/services.service';
import { DialogConfirmationComponent } from 'src/app/shared/components/dialog-confirmation/dialog-confirmation.component';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import { environment } from 'src/environments/environment';
import { ClientViewService } from '../../client-view.service';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit, CrudInterface {

  //servicios por peridos
  _servicesByPeriod:ServicesByPeriod[]=[]

  isLoading = true;
  //@Input() serBuss: Bussines | undefined;
  serBuss: Bussines | undefined;
  panelOpenState = false;
  dbp : DBusinessPeriod = {};

  dBussPer: Period[]=[];

  //_totalToPay:number=0.0

  constructor(
    private bussinesService: BussinesService,
    private periodService: PeriodService,
    private servicesService: ServicesService,
    public dialog: MatDialog,
    private showMessage: ShowMessageService,
    private clientViewService:ClientViewService,

  ) {  }

  ngOnInit(): void {
    this.readServices()
    this.listenSelectedBusiness(()=>this.readCRUD())

  }
  private listenSelectedBusiness(o:()=>void){
    this.clientViewService.getSelectedBussines().subscribe((b:Bussines |null)=>{

      if(b){
        this.serBuss=b;
        o();
      }
    })
  }

  createCRUD(object: any): boolean {
    throw new Error('Method not implemented.');
  }
  readCRUD(): boolean {
    this.isLoading=true;
    let ids: number = this.serBuss?.bussId || -1;
    //console.log(ids);

    this.bussinesService.allDBusinesPeriods(ids).subscribe({
      next: d=>{
        this.dBussPer=d.data as Period[];
        console.log("Periodos", d.data);
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

  //FUNCIONES
  openDialogChoosePeriod() {
    const dialogRef = this.dialog.open(FindPeriodComponent, {
      panelClass: 'dialog',
      data: {
        row: null,
        type: TYPES_ACTIONS_DIALOG.ADD,
        hqId: 0
      }
    });
    dialogRef.afterClosed().subscribe((result: Period) => {
      if (result) {
        console.log("Seleccionare Periodo",result);
        this.addBusinessPeriod(result);
      }
    });
  }

  addBusinessPeriod(bp: Period): boolean {
    this.dbp.prdsId = bp.prdsId;
    this.dbp.bussId = this.serBuss?.bussId;
    this.dbp.dbpState = 1;
    this.isLoading=true;

    this.bussinesService.addDBusinessPeriod(this.dbp).subscribe({
      next: data => {
        //this.dBussPer.unshift(data.data as Period)
        this.isLoading=false;
        this.readCRUD()
        this.showMessage.success({ message: data.msg });
      },
      error: error => {
        this.showMessage.error({ message: error.error.message, action: () => this.addBusinessPeriod(this.dbp) })
        this.isLoading=false
      }
    });
    return true;
  }

  readServices(){
    this.servicesService.all()?.subscribe({
      next:d=>{
        this.clientViewService.onServices(d)//this.services = d;
      }
    })
  }

  printReportAllPeriod(){
    window.open(environment.API_URL+"/v1/reports/all-periods/"+this.serBuss?.bussId);
  }

  onServProByPeriod(period:string, services:TServicesProvided[]){
    let isbp=this._servicesByPeriod.findIndex(e=>e.period==period);
    if(isbp<0){
      this._servicesByPeriod.push({period, services})
    }else{
      this._servicesByPeriod[isbp]={period, services}
    }
    
    //this._totalToPay=this._servicesByPeriod.reduce((a, b:ServicesByPeriod)=>a=a+b.services.reduce((d,e)=>d=Number(d)+Number(((e.spDebt)? e.spDebt:0.0)),0), 0.0)
  }
  reloadAllServices=(e:boolean)=>(e)?this.readCRUD():null



  delDBusinessPeriod(dbp:DBusinessPeriod){

    this.wantDeleteDBusinessPeriod(()=>this.deleteDBusinessPeriod(dbp))   
  }
 

  wantDeleteDBusinessPeriod(d:()=>void){
    this.dialog
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

  deleteDBusinessPeriod(dbp:DBusinessPeriod): boolean {
    if (dbp.bussId && dbp.prdsId) 
    this.bussinesService.delDBusinesPeriods(dbp.bussId, dbp.prdsId).subscribe({
      next: data=>{
        if(data.res){
          this.showMessage.success({message: data.msg});
          let i=this.dBussPer.findIndex(e=> e.dbp?.bussId==dbp.bussId && e.dbp?.prdsId==dbp.prdsId)
          this.dBussPer.splice(i,1);

        }else {
          this.showMessage.error({message: data.msg});
        }
      },
      error: error=>{
        this.showMessage.error({message: error.error.message})
      }
    })
    return true;
  }








  
}

export interface ServicesByPeriod{
  period:string,
  services:TServicesProvided[]
}



