import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-keyboard-alphabet',
  templateUrl: './keyboard-alphabet.component.html',
  styleUrls: ['./keyboard-alphabet.component.scss']
})
export class KeyboardAlphabetComponent implements OnInit {
  @Output() onReturnWord = new EventEmitter<string>()
  @Input() screenOut:string=''

  private _wordToSearch:string=''

  @HostListener('click', ['$event']) onClick(event:any) {
    let c=this.elementRef.nativeElement.querySelector('#out').children;
    let w=''
    for(let i=0;i<c.length;i++){
      const style=window.getComputedStyle(c[i],'::after')
      const content=style.content
      if( content=='none'){break}
      w+=content//.match(/(?<=")(.*)(?=")/s)
    }
    w=w.split('"').join('')

    if(w.length==this._wordToSearch.length){return}
    
    this._wordToSearch=w
    this.onReturnWord.emit(this._wordToSearch)
    //=w.replace('"','')

 }
  
 constructor(private elementRef:ElementRef) {}

  ngAfterViewInit() {
                              
  }
  ngOnInit(): void {
  }

}
