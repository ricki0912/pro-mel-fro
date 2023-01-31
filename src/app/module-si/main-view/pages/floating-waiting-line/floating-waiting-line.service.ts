import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { AppointmentTemp, APPOINTMENT_STATE, TAppointmentTemp } from 'src/app/interfaces/appointment-temp';
import { AppointmentTempService } from 'src/app/services/appointment-temp.service';

@Injectable({
  providedIn: 'root'
})
export class FloatingWaitingLineService {
  @Output() onControl= new EventEmitter<number>()
  @Output() onNotification= new EventEmitter<AppointmentTemp>()

  private currentAttentionTAppointment = new BehaviorSubject<TAppointmentTemp | null>(null);

  private tAppointmentTemps=new BehaviorSubject<TAppointmentTemp[]>([]);

  constructor(
    private appointmentTempService:AppointmentTempService, 
    private tokenService:TokenStorageService
  ) {   
  }

  public setNotification(a:AppointmentTemp){
    this.onNotification.emit(a)
  }
  public setControl(c:number){
    this.onControl.emit(c)
  }

  public diminish(){
    this.onControl.emit(FWLS_CONTROL.DIMINISH)
  }
  public increase(){
    this.onControl.emit(FWLS_CONTROL.INCREASE)
  }

  public hide(){
    this.onControl.emit(FWLS_CONTROL.HIDE)
  }
  public show(){
    this.onControl.emit(FWLS_CONTROL.SHOW)
  }

  

/*Metodos para actencion actual  */
onCurrentAttention(t:TAppointmentTemp | null){
  this.currentAttentionTAppointment.next(t)
}
getCurrentAttion(){
 return this.currentAttentionTAppointment
}

/*Metodo para listar los tickets pendientes de atencion */
onTAppointmentTemps(t:TAppointmentTemp[]){
  this.tAppointmentTemps.next(t)
}
getTAppointmentTemps(){
 return this.tAppointmentTemps
}



public readAppointmentTempsPendingOfMyTeller( p:Params ): boolean {
  if(typeof p.before !== 'undefined'){
    p.before()
  } 
  let hqId:number=this.tokenService.getHqId()
  let tellId:number=this.tokenService.getTeller()?.tellId || -1
  let catId:number=0/*Te permite seleccionar todos las categarias */
  let apptmState:number=APPOINTMENT_STATE.PENDING
  this.appointmentTempService.getAllBy(hqId,tellId, catId,apptmState).subscribe({
    next: (r) => {
      let data=r.data as TAppointmentTemp[]
      this.onTAppointmentTemps(data)

      if(typeof p.succes !== 'undefined'){
        p.succes()
      } 
    },
    error: () => {
      if(typeof p.error !== 'undefined'){
        p.error()
      } 
    }
  });

  return true
}


}

export enum FWLS_CONTROL {
  DIMINISH=1,HIDE=2, INCREASE=3, SHOW=4
}

interface Params{
  before?: ()=>void, 
  succes?:()=>void,
  error?:()=>void
}
