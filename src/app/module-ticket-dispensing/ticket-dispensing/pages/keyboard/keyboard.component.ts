import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
  @Output() onSendValue =new EventEmitter<string>()
  
  value:string = '';

  public keys:any=[
    [
      {value:9, color:'', colspan:1, onClick: (value:number)=>this.appendValue(value)},
      {value:8, color:'', colspan:1, onClick: (value:number)=>this.appendValue(value)},
      {value:7, color:'', colspan:1, onClick: (value:number)=>this.appendValue(value)},
    ],
    [
      {value:6, color:'', colspan:1, onClick: (value:number)=>this.appendValue(value)},
      {value:5, color:'', colspan:1, onClick: (value:number)=>this.appendValue(value)},
      {value:4, color:'', colspan:1, onClick: (value:number)=>this.appendValue(value)},
    ],
    [
      {value:3, color:'', colspan:1, onClick: (value:number)=>this.appendValue(value)},
      {value:2, color:'', colspan:1, onClick: (value:number)=>this.appendValue(value)},
      {value:1, color:'', colspan:1, onClick: (value:number)=>this.appendValue(value)},
    ],
    [
      {value:"C", color:'primary', colspan:1, onClick: (value:number)=>this.clear()},
      {value:0, color:'', colspan:1, onClick: (value:number)=>this.appendValue(value)},
      {value:"AC", color:'', colspan:1, onClick: (value:number)=>this.clearAll()},
    ],
    
  ] 

  constructor() { }

  ngOnInit(): void {
  }

  appendValue(value:number){
    this.value+=value
  }

  clear(){
    this.value=this.value.slice(0,-1)
  }

  clearAll(){
    this.value=''
  }

  sendValue(){
    this.onSendValue.emit(this.value)
  }
  


  

}


