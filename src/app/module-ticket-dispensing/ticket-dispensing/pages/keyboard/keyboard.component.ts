import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppointmentTemp, APPOINTMENT_KIND_CLIENT } from 'src/app/interfaces/appointment-temp';
import { Bussines } from 'src/app/interfaces/bussines';
import { CategoryTree, CATEGORY_LINK_BUS, CATEGORY_TYPES_AUTH } from 'src/app/interfaces/category';
import { Person } from 'src/app/interfaces/person';
import { BussinesService } from 'src/app/services/bussines.service';
import { HeadService } from '../head/head.service';
import { ApiPeruService } from 'src/app/servicesx/api-peru.service'
import { ApisPeruService } from 'src/app/servicesx/apisperu.service';
import { FindBusinessComponent } from '../find-business/find-business.component';
import { MatDialog } from '@angular/material/dialog';
import { KeyboardService } from './keyboard.service';
import { TicketDispensingService } from '../../ticket-dispensing.service';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
  @Output() onReturnValue = new EventEmitter<AppointmentTemp>()
  @Output() onFindBusiness = new EventEmitter<boolean>()

  @Input() categoryTree!: CategoryTree
  public appointmentTemp?:AppointmentTemp
  KM=KIND_MESSAGE
  CTB=CATEGORY_LINK_BUS
  


  value: string = '';
  bussines?: Bussines | null=null;
  person?:Person | null= null;

  //public message: string = '';
  state: boolean=false;
  loading:boolean=false;
  
  message:Message={kind:KIND_MESSAGE.INITIAL_MESSAGE,title: 'Importante',message:'En el teclado ingresa tu número RUC  para generar una cita.'}
 

    public keys: any = [
    [
      { value: 7, color: '', colspan: 1,rowspan:1, onClick: (value: number) => this.appendValue(value) },
      { value: 8, color: '', colspan: 1,rowspan:1, onClick: (value: number) => this.appendValue(value) },
      { value: 9, color: '', colspan: 1,rowspan:1, onClick: (value: number) => this.appendValue(value) },

    ],
    [
      { value: 4, color: '', colspan: 1,rowspan:1, onClick: (value: number) => this.appendValue(value) },
      { value: 5, color: '', colspan: 1,rowspan:1, onClick: (value: number) => this.appendValue(value) },
      { value: 6, color: '', colspan: 1,rowspan:1, onClick: (value: number) => this.appendValue(value) },
    ],
    [
      { value: 1, color: '', colspan: 1,rowspan:1, onClick: (value: number) => this.appendValue(value) },
      { value: 2, color: '', colspan: 1,rowspan:1, onClick: (value: number) => this.appendValue(value) },
      { value: 3, color: '', colspan: 1,rowspan:1, onClick: (value: number) => this.appendValue(value) },
    ],
    [
      { value: "", color: 'warm', colspan: 1,rowspan:1, onClick: (value: number) =>{}  },
      { value: 0, color: '', colspan: 1,rowspan:1, onClick: (value: number) => this.appendValue(value) },
      { value: "", color: '', colspan: 1,rowspan:1, onClick: (value: number) => {}},
    ],

  ]

  constructor(
    private bussinesService: BussinesService,
    private headService:HeadService,
    private apiPeruService:ApisPeruService,
    private _dialog:MatDialog,
    private _keyboardService:KeyboardService,
    private _ticketDispensingService:TicketDispensingService

  ) {
  }

  ngOnInit(): void {
    this.loadMessage();
    this.onValue();
    
  }
  onValue(){
    this._keyboardService.onValue.subscribe(e=>{
      
      if(e){
        this.value=e
        this.beforeSearch()
      }

    })


  }
  goHome(){
    this._ticketDispensingService.goHome()
    this._keyboardService.setValue(null)

  }

  loadMessage(){
    let message:string=''
    if(this.categoryTree.catLinkBus==CATEGORY_LINK_BUS.YES && this.categoryTree.catAuth==CATEGORY_TYPES_AUTH.RUC){
      message='Digite su número de RUC. '
    }else if(this.categoryTree.catAuth==CATEGORY_TYPES_AUTH.RUC){
      message='Digite su número de RUC.'
    }else if(this.categoryTree.catAuth==CATEGORY_TYPES_AUTH.DNI){
      message='Digite su número de DNI.'
    }else if(this.categoryTree.catAuth==CATEGORY_TYPES_AUTH.ANYONE){
      message='Digite su número de DNI o RUC.'
    }
    
    this.headService.setMessage(message)

  }
  appendValue(value: number) {
    if(this.categoryTree.catAuth == CATEGORY_TYPES_AUTH.ANYONE && this.value.length>=11){
      return
    }else if(this.categoryTree.catAuth==CATEGORY_TYPES_AUTH.DNI && this.value.length>=8){
      return
    }else if(this.categoryTree.catAuth==CATEGORY_TYPES_AUTH.RUC && this.value.length>=11){
      return
    }
    this.value += value
    this.beforeSearch() 

  }

  clear() {
    this.value = this.value.slice(0, -1)
    this.beforeSearch() 

  }

  clearAll() {
    this.value = ''
    this.beforeSearch() 

  }

  sendValue() {

    this.onReturnValue.emit(this.appointmentTemp)
    this._keyboardService.setValue(null)

  }

  beforeSearch() {
    
    const v = this.value
    const l = v.length
    
    if (this.categoryTree.catAuth == CATEGORY_TYPES_AUTH.DNI && l == 8/*longitud dni */) {
      this.existDniCRUDApiPeru(v, this.searchByDNI)
    } else if (this.categoryTree.catAuth == CATEGORY_TYPES_AUTH.RUC && this.categoryTree.catLinkBus == CATEGORY_LINK_BUS.YES && l == 11) {
      this.existRucCRUD(v, this.searchByRUCInBuss)
    } else if (this.categoryTree.catAuth == CATEGORY_TYPES_AUTH.RUC && l == 11) {
      this.existRucCRUDApiPeru(v, this.searchByRUC)
    } else if (this.categoryTree.catAuth == CATEGORY_TYPES_AUTH.ANYONE && l == 8 ) {
      this.existDniCRUDApiPeru(v, this.searchByDNI)
    }else if (this.categoryTree.catAuth == CATEGORY_TYPES_AUTH.ANYONE && l == 11 ) {
      this.existRucCRUDApiPeru(v, this.searchByRUC)
    }else{
      this.message={kind:KIND_MESSAGE.INITIAL_MESSAGE,title: 'Importante',message:'En el teclado ingresa tu número RUC  para generar una cita.'}

      this.searchDefault();
    }
  }
  searchByDNI=(d:any)=> {
    if(this.value.length!=8){
      return;
    }
    if (d.dni) {
      this.appointmentTemp={
        apptKindClient:APPOINTMENT_KIND_CLIENT.PERSON,
        
        apptmNumberDocClient: d.dni,
        apptmNameClient: `${d.nombres} ${d.apellidoPaterno} ${d.apellidoMaterno}` //this.nameOwn(d.data.nombre_completo)
      }

      //this.bussines = d;
      //this.headService.setMessage(((d.data.sexo==="MASCULINO")?"Bienvenido ":"Bienvenida ")+this.nameOwn(d.data.nombres)+", seleccione en confimar para generar una cita.")
      this.message={kind: KIND_MESSAGE.MESSAGE_FOUND, title: 'Bienvenido(a)', message: this.nameOwn(d.nombres)+", seleccione en confimar para generar una cita."}


      //this.message={kind: KIND_MESSAGE.MESSAGE_FOUND, message: "Bienvenido(a) "+this.nameOwn(d.nombres)+", seleccione en confimar para generar una cita."}
      /*Parte del codigo modificado para no tocar */
      //this.headService.setMessage("Bienvenido(a) "+this.nameOwn(d.nombres)+", seleccione en confimar para generar una cita.")
      
      
      //this.message = d.bussName || ''
      this.state=true;
    }
    else {
      this.appointmentTemp={
        apptKindClient:APPOINTMENT_KIND_CLIENT.PERSON,
        apptmNumberDocClient:this.value
      }
      this.loadMessage()
      //this.message = ''
      this.message={kind: KIND_MESSAGE.MESSAGE_FOUND,title: 'Bienvenido(a):', message: "Seleccione en confimar para generar una cita."}

      this.state=true;
    }
  }

  searchByRUC=(d:any) =>{
    if(this.value.length!=11){
      return;
    }
    if (d.ruc) {
      this.appointmentTemp={
        apptKindClient:APPOINTMENT_KIND_CLIENT.BUSINESS,
        //bussId:d.bussId,
        apptmNumberDocClient: d.ruc,//d.bussRUC
        apptmNameClient:d.razonSocial
      }

      //this.bussines = d;
      
      this.message={kind:KIND_MESSAGE.MESSAGE_FOUND, title: 'Bienvenido(a)', message:d.razonSocial+", seleccione en confimar para generar una cita." }
      
      //this.headService.setMessage("Bienvenido "+d.razonSocial+", seleccione en confimar para generar una cita.")
      //this.message = d.bussName || ''
      this.state=true;
    }
    else {
      this.appointmentTemp={
        apptKindClient:APPOINTMENT_KIND_CLIENT.BUSINESS,
        apptmNumberDocClient:this.value
      }
      this.loadMessage()
      //this.message = ''
      this.message={kind: KIND_MESSAGE.MESSAGE_FOUND, title: 'Bienvenido(a)', message: "Seleccione en confimar para generar una cita."}

      this.state=true;
    }
  }
  
  searchByRUCInBuss=(d:Bussines)=>{
    if (d) {
      this.appointmentTemp={
        apptKindClient:APPOINTMENT_KIND_CLIENT.BUSINESS,
        bussId:d.bussId,
        apptmNumberDocClient:d.bussRUC,
        apptmNameClient:d.bussName
      }
      
      this.bussines = d;
      this.message={kind: KIND_MESSAGE.MESSAGE_FOUND, title: 'Bienvenido(a) ', message:d.bussName+", seleccione en confimar para generar una cita."}
      //this.headService.setMessage("Bienvenido "+d.bussName+", seleccione en confimar para generar una cita.")
      //this.message = d.bussName || 'SIN NOMBRE'
      this.state=true;
    }
    else {
      
      this.appointmentTemp={}

      this.message={kind: KIND_MESSAGE.MESSAGE_NO_FOUND, title: 'No encontrado', message: "No fue posible encontrar tu RUC. Verifique nuevamente o te sugerimos seleccionar uno de nuestros servicio de consulta."}
      //this.headService.setMessage("No fue posible encontrar tu RUC. Verifique nuevamente o te sugerimos seleccionar uno de nuestros servicio de consulta.")
      //this.message = 'LO SENTIMOS. POR FAVOR REGRESE Y SELECCIONE OTRO SERVICIO.'
      this.state=false;
    }
  }

  searchDefault(){
    this.bussines=null
    this.person=null
    //this.message=''
    this.state=false
    this.loading=false
  }

  existRucCRUD(bussRUC: string, c: (d:Bussines) => void) {
    this.message={kind:KIND_MESSAGE.LOADING_MESSAGE, title: 'Validando',message: 'Estamos validando tu solicitud' }

    this.loading=true;
    this.bussinesService.existRuc(bussRUC).subscribe({
      next: d =>{
         c(d)
         this.loading=false;
        },
      error: e => {

      }

    });
  }

  existRucCRUDApiPeru(bussRUC: string, c: (d:any) => void) {
    this.message={kind:KIND_MESSAGE.LOADING_MESSAGE, title: 'Validando',message: 'Estamos validando tu solicitud' }

    this.loading=true;
    this.apiPeruService.findByRUC(bussRUC).subscribe({
      next: d =>{
         c(d)
         this.loading=false;
        },
      error: e => {

      }

    });
  }

  existDniCRUDApiPeru(dni: string, c: (d:any) => void) {
    this.message={kind:KIND_MESSAGE.LOADING_MESSAGE, title: 'Validando',message: 'Estamos validando tu solicitud' }

    this.loading=true;
    this.apiPeruService.findByDNI(dni).subscribe({
      next: d =>{
         c(d)
         this.loading=false;
        },
      error: e => {

      }

    });
  }




  existDniCRUD(perNumberDoc: string, c: (d:Person) => void) {
    this.message={kind:KIND_MESSAGE.LOADING_MESSAGE, title: 'Validando',message: 'Estamos validando tu solicitud' }

    this.person={perNumberDoc: perNumberDoc}
    //this.message=''
    this.state=true;
    this.appointmentTemp={
      apptKindClient:APPOINTMENT_KIND_CLIENT.PERSON,
      apptmNumberDocClient:this.value
    }
  }
 
  
private nameOwn(w:string):string{
  w=w.toLowerCase()
 return w.replace(/([^\s]+)/gm, function (t) {
    return t.charAt(0).toUpperCase() + t.substring(1);
});
}



findBusiness(){
  this.onFindBusiness.emit(true)
}

openDialogFindBuss() {
  const dialogRef = this._dialog.open(FindBusinessComponent, {
    panelClass: 'dialog',
    maxWidth: '100vw',
    maxHeight: '100vh',
     height: '100%',
     width: '100%',
    data: {
      row: null,
      type: null ,
      hqId: 0
    }
  });
  dialogRef.afterClosed().subscribe((result: Bussines) => {
    if (result.bussRUC) {
      
      this.value=result.bussRUC
      this.beforeSearch()
      //this.addBusinessPeriod(result);
    }
  });
}

}

interface Message{
  kind:KIND_MESSAGE,
  title:string
  message:string
}

enum KIND_MESSAGE{
  INITIAL_MESSAGE=1, LOADING_MESSAGE=2, MESSAGE_FOUND=3, MESSAGE_NO_FOUND=4
}




