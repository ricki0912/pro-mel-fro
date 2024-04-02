import { Component, Input } from '@angular/core';
import { Bussines } from 'src/app/interfaces/bussines';
import { Teller } from 'src/app/interfaces/teller';
import { StatementService } from 'src/app/services/statement.service';

@Component({
  selector: 'app-pending-and-observed',
  templateUrl: './pending-and-observed.component.html',
  styleUrls: ['./pending-and-observed.component.scss']
})
export class PendingAndObservedComponent {
  isLoading:boolean=false
  
  private _tellId:number=0;
  @Input() public set tellId (v:number){
   this._tellId=v;
   this.beforeCallPendingsAndObserved()
 }

  private _dbmMonth:number=0;
   @Input() public set dbmMonth (v:number){
    this._dbmMonth=v;
    this.beforeCallPendingsAndObserved()
  }

  private _prdsId:number=0;
  @Input() public set prdsId (v:number){
    this._prdsId=v;
    this.beforeCallPendingsAndObserved()
  }

  private _ln:number=-2;
  @Input() public set  ln(v:number){
    this._ln=v
    this.beforeCallPendingsAndObserved()
    
  }
  businessPendings:Bussines[]=[]
  businessObserveds:Bussines[]=[]
  businessProcesseds:Bussines[]=[]
  constructor(
    private statementService: StatementService
  ){

    
  }

  ngOnInit(): void {

  }

  beforeCallPendingsAndObserved=()=>{
    if(this._prdsId>0 && this._dbmMonth>0)
      this.pendingsAndObserved(this._tellId, this._prdsId,this._dbmMonth, this._ln)
  };

  pendingsAndObserved(tellId:number, prdsId:number, dbmMonth:number, ln:number){
    this.isLoading=true
    this.statementService.pendingsAndObserveds({tellId,prdsId, dbmMonth, ln})
      .subscribe({
        next: (d)=>{
          let pendings=d.data.pendings as Bussines[];
          let observeds=d.data.observeds as Bussines[];
          let processeds=d.data.processeds as Bussines[];
          let tellersA=d.data.tellers as Teller[]
          let tellersO=tellersA.reduce((e, b)=>({...e, [String(b.tellId)]:b}),{}) as any

          this.businessPendings=pendings.map(e=>{
            return {...e, teller:tellersO[String(e.tellId)]}
          });

          this.businessObserveds=observeds.map(e=>{
            return {...e, teller:tellersO[String(e.tellId)]}
          });

          this.businessProcesseds=processeds;

          console.log(this.businessObserveds, this.businessPendings)

          /*this.businessObserveds=processeds.map(e=>{
            return {...e, teller:tellersO[String(e.tellId)]}
          });*/
          
          //this.businessProcesseds=

          this.isLoading=false
        },
         error:(e)=>{
          
        }
      })
  }

  
}
