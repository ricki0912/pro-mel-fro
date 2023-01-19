import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AnnualResumeDetails } from 'src/app/interfaces/annual-resume-details';

@Component({
  selector: 'app-table-register',
  templateUrl: './table-register.component.html',
  styleUrls: ['./table-register.component.scss']
})
export class TableRegisterComponent {
  @Input() isEditable:boolean=false
   dataSourceM: AnnualResumeDetails[] = [];
   dataSourceA: AnnualResumeDetails[] = [];
   
   arDescription:string=''
   
   @Output() onSave = new EventEmitter<AnnualResumeDetails[]>();
   public setSave = ()=> this.onSave.emit([...this.dataSourceA, ...this.dataSourceM])
    @Output() onArDescription=new EventEmitter<string>()
    public setArDescription=()=>this.onArDescription.emit(this.arDescription)


 
  @Input() public set dataSource(val: AnnualResumeDetails[]) {
    this.dataSourceM = val.filter(e=>((e.ardMonth || 0)>=1 && (e.ardMonth ||0)<=12));
    this.dataSourceA=val.filter(e=>(e.ardMonth ||0) >=13 )
    
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