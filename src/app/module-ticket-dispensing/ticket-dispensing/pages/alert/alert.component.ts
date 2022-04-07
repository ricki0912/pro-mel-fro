import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  //@Output() onTryAgain = new EventEmitter<any>()
  //@Output() onComeBack=new EventEmitter<any>()

  public AL = ALERT_STATE
  public alert: AlertInterface = { message: '' }

  private t: any;
  public isDisplay:boolean=false

  constructor(
    public alertService: AlertService
  ) { }

  ngOnInit(): void {
    //this.onTryAgain.emit({})
    this.alertService.onAlert.subscribe((o) => {
      this.alert = o;

      this.isDisplay=true
      if (this.alert.state == ALERT_STATE.SUCCESS)
        this.openAndCloseAuto()
    })

  }

  openAndCloseAuto() {

    this.t = setTimeout(() => {
      if (typeof this.alert.success !== 'undefined') {
        this.isDisplay=false
        this.alert.success()


      }
    }, 10000);
  }
  cancelCloseAuto() {
    clearTimeout(this.t);
  }
  onTryAgain() {
    if (typeof this.alert.tryAgain !== 'undefined') {
      this.isDisplay=false
      this.alert.tryAgain()
    }
  }

  onComeBack() {
    if (typeof this.alert.comeBack !== 'undefined') {
      this.isDisplay=false
      this.alert.comeBack()
    }
    //this.onComeBack.emit({})
  }
  onSuccess() {
    if (typeof this.alert.success !== 'undefined') {
      this.isDisplay=false
      this.alert.success();
      this.cancelCloseAuto();

    }
  }
}

export interface AlertInterface {
  message: string,
  tryAgain?: () => void,
  comeBack?: () => void,
  success?: () => void,
  state?: ALERT_STATE
}

export enum ALERT_STATE {
  SUCCESS = 1, ERROR = 2
}