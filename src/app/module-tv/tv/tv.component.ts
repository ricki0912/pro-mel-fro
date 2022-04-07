import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import {LoadingService} from 'src/app/shared/components/loading/loading.service'
import { WaitingLineService } from 'src/app/socket/waiting-line.service';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss']
})
export class TVComponent implements OnInit {
  @ViewChild('form') form!: NgForm

  newMessage$?:Observable<string>;
  messages:string[]=[]
  

  constructor(
    private serviceLoading:LoadingService ,
    private waitingLineService: WaitingLineService
  ) { }

  ngOnInit(): void {
    this.serviceLoading.hide()
    /**todo: refactor - unsuscribe */
    /*this.waitingLineService.getNewMessage().subscribe({
      next: (message:string)=>{
        console.log(message, "Servicio de waiting")
        this.messages.push(message)
      }, 
      error: e=>{

      }
    });*/
  }
/*
  onSubmit(){
    console.log("Para retornrar")
    const {message}= this.form.value
    if(!message) return;
    this.waitingLineService.sendMessage(message)
    this.form.reset
  }
 */

}

