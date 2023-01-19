import { Component, Input } from '@angular/core';
import { AnnualResume } from 'src/app/interfaces/annual-resume';
import { AnnualResumeDetails } from 'src/app/interfaces/annual-resume-details';
import { Bussines } from 'src/app/interfaces/bussines';
import { Period } from 'src/app/interfaces/period';
import { AnnualResumeService } from 'src/app/services/annual-resume.service';
@Component({
  selector: 'app-table-edit',
  templateUrl: './table-edit.component.html',
  styleUrls: ['./table-edit.component.scss'],
})
export class TableEditComponent {
  private _period?:Period=undefined

  @Input() isEditable:boolean=false
  @Input() bussines?:Bussines=undefined
  @Input() public set period(val: Period | undefined) {
    this._period = val;
    if(this.bussines?.bussId && this._period?.prdsId){
      this.getDataAnnualResume(this.bussines.bussId, this._period.prdsId)
    }
  }

  public get period():Period | undefined {
    return this._period 
  }


  NT=NAME_TEMPLATE
  selectedTemplate=NAME_TEMPLATE.SELECT_PERIOD

  annualResume?:AnnualResume=undefined

  //dataSource:AnnualResumeDetails[]=[]


  constructor(
    private annualResumeService:AnnualResumeService
  ) {
   
  
  }

  ngOnInit()	{
 

   if(this.bussines?.bussId && this.period?.prdsId){
     this.getDataAnnualResume(this.bussines.bussId, this.period.prdsId)
    }

  }


  public generateRegister(v:boolean){
    const aux = [];
    for (let i = 1; i <= 14; i++) {
      aux.push({
        ardMonth: i,
        ardTaxBase: undefined,
        ardTax: undefined,
        ardTotal: 0.00,
        ardPlame: undefined,
        ardFee: undefined,
      });

    }

    this.annualResume={bussId:this.bussines?.bussId, prdsId:this.period?.prdsId,annualResumeDetails:aux}

//    this.dataSource = aux;
    this.selectedTemplate=NAME_TEMPLATE.TABLE_REGISTER
  }

  getDataAnnualResume=(bussId:number, prdsId:number)=>{
    console.log(bussId, '----- periodp',prdsId)
    this.selectedTemplate=NAME_TEMPLATE.LOADING
    this.annualResumeService.findBy(bussId, prdsId).subscribe({
      next: d =>{

        this.annualResume=d.data as AnnualResume
        if(this.annualResume){
          this.selectedTemplate=NAME_TEMPLATE.TABLE_REGISTER
        }else{
          if(this.isEditable){
            this.selectedTemplate=NAME_TEMPLATE.GENERATE_REGISTER
          }else{
            this.selectedTemplate=NAME_TEMPLATE.NO_HAVE_REGISTER
          }
        }

        
      }, error:e=>{
        console.log(e)
        this.selectedTemplate=NAME_TEMPLATE.ERROR
      }
    });
  }

  

  createUpdate(annualResume:AnnualResume){
    
    console.log("annual----",annualResume)
    this.annualResumeService.createUpdate(annualResume).subscribe({
      next: d=>{
        console.log("HOlaaaa", d)
      }, error:e=>{
        console.log(e)
      }
    })
  }

  saveDetails(v:AnnualResumeDetails[]){
    
    //this.dataSource=v
    if(this.annualResume){
      this.annualResume.annualResumeDetails= v
      this.createUpdate(this.annualResume)

    }
    
    //console.log(v)
  }
  saveArDescription(s:string){
    if(this.annualResume?.arDescription) this.annualResume.arDescription=s
  }

}

export  enum NAME_TEMPLATE {
  LOADING='loading', 
  SELECT_PERIOD='selectPeriod',  
  GENERATE_REGISTER='generateRegister', 
  TABLE_REGISTER='tableRegister',
  NO_HAVE_REGISTER='noHaveRegister',
  ERROR='error'

}



