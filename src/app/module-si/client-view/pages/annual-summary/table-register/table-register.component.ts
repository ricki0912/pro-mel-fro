import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AnnualResumeDetails } from 'src/app/interfaces/annual-resume-details';

@Component({
  selector: 'app-table-register',
  templateUrl: './table-register.component.html',
  styleUrls: ['./table-register.component.scss']
})
export class TableRegisterComponent {
  @Input() isEditable:boolean=false
  @Input() hasModified:boolean=false
  dataSourceM: AnnualResumeDetails[] = [];
   dataSourceA: AnnualResumeDetails[] = [];

  
   

   //
   private _dataSourceMOld: AnnualResumeDetails[] = [];
   private _dataSourceAOld: AnnualResumeDetails[] = [];


   arDescription:string=''
   
   @Output() onSave = new EventEmitter<AnnualResumeDetails[]>();
   public setSave = ()=> this.onSave.emit([ ...this.dataSourceM, ...this.dataSourceA])
    @Output() onArDescription=new EventEmitter<string>()
    public setArDescription=()=>this.onArDescription.emit(this.arDescription)


 
  @Input() public set dataSource(val: AnnualResumeDetails[]) {
    this.dataSourceM = val.filter(e=>((e.ardMonth || 0)>=1 && (e.ardMonth ||0)<=12));
    this.dataSourceA=val.filter(e=>(e.ardMonth ||0) >=13 )
    

    /*this._dataSourceAOld=val.filter(e=>(e.ardMonth ||0) >=13 )
    this._dataSourceMOld=val.filter(e=>((e.ardMonth || 0)>=1 && (e.ardMonth ||0)<=12));*/
  /*  if(this.bussines?.bussId && this._period?.prdsId){
      this.getDataAnnualResume(this.bussines.bussId, this._period.prdsId)
    }*/
  }


  showDescription = true;
  showDescriptionEdit = false;
  showEditDescription() {
    this.showDescription = !this.showDescription;
    this.showDescriptionEdit = !this.showDescriptionEdit;
  }

  displayedColumns: string[] = COLUMNS_SCHEMA_NOT_EDIT.map((col) => col.key);
  columnsSchema: any = COLUMNS_SCHEMA_NOT_EDIT;
  defaultValue:string='-'

  ngOnInit()	{
    if(this.isEditable){
      this.displayedColumns=COLUMNS_SCHEMA_EDIT.map(col=>col.key)
      this.columnsSchema= COLUMNS_SCHEMA_EDIT
   }
  }
  findMonth = (id: number) => MONTHS.find((e) => e.id == id);

  saveRow(element:any){
    element.isEdit = !element.isEdit
    this.hasModified=true
    /*let indexMOld=this._dataSourceMOld.findIndex(e=>e.ardMonth==element.ardMonth);
    
    let selectedRowOld=this._dataSourceMOld[indexMOld];


    console.log(element, selectedRowOld)
    
    if(this.compare(element, selectedRowOld)){
      console.log("Modificado con exito")
    }    */

    
    

    
  }


  compare( x:any, y:any ) {
    if ( x === y ) return true;
    // if both x and y are null or undefined and exactly the same

    if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) return false;
    // if they are not strictly equal, they both need to be Objects

    if ( x.constructor !== y.constructor ) return false;
    // they must have the exact same prototype chain, the closest we can do is
    // test there constructor.

    for ( var p in x ) {
        if ( ! x.hasOwnProperty( p ) ) continue;
        // other properties were tested using x.constructor === y.constructor

       if ( ! y.hasOwnProperty( p ) ) return false;
       // allows to compare x[ p ] and y[ p ] when set to undefined

       if ( x[p] === y[p] ) continue;
       // if they have the same strict value or identity then they are equal

       if ( typeof( x[ p ] ) !== "object" ) return false;
       // Numbers, Strings, Functions, Booleans must be strictly equal

       if ( ! this.compare( x[ p ],  y[ p ] ) ) return false;
       // Objects and Arrays must be tested recursively
   }

   for ( p in y ) {
      if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) return false;
      // allows x[ p ] to be set to undefined
    }
    return true;
}


  areEqual=(dataSourceA: AnnualResumeDetails[],dataSourceM: AnnualResumeDetails[])=>{
    let state=false;
    for (let i:number=0; i<dataSourceM.length;i++){
        /*if(dataSourceM[i] as AnnualResumeDetails!=this._dataSourceMOld[i] as AnnualResumeDetails){
          return true;
        }  */
      
      let object=dataSourceM[i] as any;
        let objectOld=this._dataSourceMOld[i] as any;
      for (let key in object) {
        if(object[key]!=objectOld[key]){
          return true
          console.log("HOlaaa")
        }
      /*
        if (Object.prototype.hasOwnProperty.call(key, key)) {
          const element = object[key];
          
        }*/
      }
    }
    

    return state
    //return (JSON.stringify(dataSourceA)==JSON.stringify(this._dataSourceAOld) || JSON.stringify(dataSourceM)==JSON.stringify(this._dataSourceMOld) ) 
   
  }
}



const COLUMNS_SCHEMA_NOT_EDIT = [
  {
    key: 'ardMonth',
    type: 'isArdMonth',
    label: 'Meses',
    placeholder:'Mes'
  },
  {
    key: 'ardTaxBase',
    type: 'isArdTaxBase',
    label: 'Base Imponible',
    placeholder:'Base Imp.'
  },
  {
    key: 'ardTax',
    type: 'isArdTax',
    label: 'I.G.V',
    placeholder:'I.G.V.'
  },
  {
    key: 'ardTotal',
    type: 'isArdTotal',
    label: 'Total',
    placeholder:'Total'
  },
  {
    key: 'ardPlame',
    type: 'isArdPlame',
    label: 'Plame',
    placeholder:'Plame'
  },
  {
    key: 'ardFee',
    type: 'isArdFee',
    label: 'Honorarios',
    placeholder:'Hon.'
  }

];

const  COLUMNS_SCHEMA_EDIT=[...COLUMNS_SCHEMA_NOT_EDIT, {key: 'isEdit', type: 'isEdit', label: '',},]


const MONTHS: Month[] = [
  { id: 1, name: 'ENERO', bold:false, editable:true },
  { id: 2, name: 'FEBRERO', bold:false, editable:true },
  { id: 3, name: 'MARZO', bold:false, editable:true },
  { id: 4, name: 'ABRIL', bold:false, editable:true },
  { id: 5, name: 'MAYO', bold:false, editable:true },
  { id: 6, name: 'JUNIO', bold:false, editable:true },
  { id: 7, name: 'JULIO', bold:false, editable:true },
  { id: 8, name: 'AGOSTO', bold:false, editable:true },
  { id: 9, name: 'SETIEMBRE', bold:false, editable:true },
  { id: 10, name: 'OCTUBRE', bold:false, editable:true },
  { id: 11, name: 'NOVIEMBRE', bold:false, editable:true },
  { id: 12, name: 'DICIEMBRE', bold:false, editable:true },
  { id: 13, name: 'TOTAL', bold:true, editable:false },
  { id: 14, name: 'BALANCE ANUAL', bold:false, editable:true },
];
interface Month {
  id: number;
  name: string;
  bold:boolean,
  editable:boolean
}