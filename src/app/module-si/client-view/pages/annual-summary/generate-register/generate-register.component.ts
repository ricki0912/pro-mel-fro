import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-generate-register',
  templateUrl: './generate-register.component.html',
  styleUrls: ['./generate-register.component.scss']
})
export class GenerateRegisterComponent {
  @Output() onGenerateRegister = new EventEmitter<any>();
  public setGenerateRegister = (val:boolean)=> this.onGenerateRegister.emit(val)

}
