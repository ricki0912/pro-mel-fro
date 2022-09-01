import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalHelpers } from 'src/app/global/helpers/global.helpers';
import { Appointment } from 'src/app/interfaces/appointment';
import { Headquarter } from 'src/app/interfaces/headquarter';
import { Payment, PAYMENT_KIND_CANCELED } from 'src/app/interfaces/payment';
import { Teller } from 'src/app/interfaces/teller';
import { User } from 'src/app/interfaces/user';
import { PaymentService } from 'src/app/services/payment.service';
import { LoadingService } from 'src/app/shared/components/loading/loading.service';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';

@Component({
  selector: 'app-detail-payment',
  templateUrl: './detail-payment.component.html',
  styleUrls: ['./detail-payment.component.scss']
})
export class DetailPaymentComponent implements OnInit {
  public payment?:Payment
  public headquarter?:Headquarter
  public teller?:Teller
  public user?:User
  public appointment?:Appointment

  PKC=PAYMENT_KIND_CANCELED

  constructor(
    private paymentService:PaymentService,
    private showMessage:ShowMessageService,
    private loadingService:LoadingService,
    private activate : ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.activate.params.subscribe((params)=>{
      //console.log(params)
      this.proofOfPaymentJson(params['payToken']);
    })
  }
  
  proofOfPaymentJson=(payToken:string)=>{
    this.loadingService.show()
    this.paymentService.proofOfPaymentJson(payToken).subscribe({
      next:(d)=>{
        this.payment=d.data.payment as Payment
        this.headquarter=d.data.headquarter as Headquarter
        this.teller=d.data.teller as Teller
        this.user=d.data.user as User
        this.appointment=d.data.appointment as Appointment
        this.loadingService.stop()
        console.log(d)
      }, error:(e)=>{
        
        this.showMessage.error({message:'Surgio un error '+e.error.meesage})
      }
    
    })
    
  }
  
  foramtDate=(d:Date)=>GlobalHelpers.formatDateAndHour(d)
  diffBetweenDate=(appointment:Appointment)=>(appointment.apptmDateTimePrint && appointment.apptmDateStartAttention) ?GlobalHelpers.diffBetweenDate(appointment.apptmDateTimePrint, appointment.apptmDateStartAttention):''

  public openPDFNewWindow=(p:Payment)=>GlobalHelpers.downloadProofOfPayment(p)
  

}
