import { ParentInterface } from "../global/parents/parent.interface";
import { Person } from "./person";


export interface Bussines extends ParentInterface{
  bussId ?: number,
  bussKind ?: string,
  bussName ?: string,
  bussRUC ?: string,
  bussAddress ?: string,
  bussSunatUser ?: string,
  bussSunatPass ?: string,
  bussCodeSend ?: string,
  bussCodeRNP ?: string,
  bussAfpUser ?: string,
  bussAfpPass ?: string,
  bussDetractionsPass ?: string,
  bussSimpleCode ?: string,
  bussSisClave ?: string,
  bussDateMembership ?: Date,
  bussDateStartedAct ?: string,
  bussState ?: string,
  bussStateDate ?: Date,
  bussFileKind ?: string,
  bussFileNumber ?: number,
  bussRegime ?: string,
  bussKindBookAcc ?: string,
  bussTel ?: string,
  bussTel2 ?: string,
  bussTel3 ?: string,
  bussEmail ?: string,
  bussObservation ?: string,
  tellId ?: number,
  perId ?: number,
  person: Person

  bussComment?:string

   created_at?:Date
}

export interface TellerJoinUsers {
  tellId?: number;
  tellCode?: string;
  tellName?: string;
  name?: string;
  hqId?: number;
  cantBusiness?: number;

  tellState?: number;

}

/*Estado de negocio */
export enum BUSSINES_STATE{
   ENABLE=1,  SUSPENDED=2, RETIRED=3

}
export interface BussinesState{
  bussState:number, 
  bussStateName:string
}

export const DATA_BUSSINES_STATE:BussinesState[]=[
  {bussState:BUSSINES_STATE.ENABLE ,bussStateName:'Activo'},
  {bussState:BUSSINES_STATE.SUSPENDED ,bussStateName:'Suspendido'},
  {bussState:BUSSINES_STATE.RETIRED ,bussStateName:'Retirado'}
]
/*Color de estado de negocio */
export enum BUSSINES_COLOR{
  ENABLE='#28a745',
  SUSPENDED='#dc3545',
  RETIRED='#ffc107'
}

/*Tipo de negocio */
export enum BUSSINES_KIND{
  BUSSINES=1,
  PERSON_WIHT_BUSSINES=2,
  PERSON_WITHOUT_BUSSINES=3
}

interface BussinesKind{
  bussKind:number,
  bussKinkName:string
}

export const DATA_BUSSINES_KIND:BussinesKind[] = [
  {bussKind:BUSSINES_KIND.BUSSINES, bussKinkName:"Persona Júridica"},
  {bussKind:BUSSINES_KIND.PERSON_WIHT_BUSSINES, bussKinkName:"Persona Natural con Negocio"},
  {bussKind:BUSSINES_KIND.PERSON_WITHOUT_BUSSINES, bussKinkName:"Persona Natural sin Negocio"},
]

/*Regimen de negocio*/
export enum BUSSINES_REGIME{
  ESPECIAL=1,
  GENERAL=2, 
  MYPE_TRIBUTARIO=3
}

export interface BussinesRegime{
  bussRegime:number,
  bussRegimeName:string
}

export const DATA_BUSSINES_REGIME:BussinesRegime[]=[
  {bussRegime:BUSSINES_REGIME.ESPECIAL, bussRegimeName:'Especial'},
  {bussRegime:BUSSINES_REGIME.GENERAL, bussRegimeName:'General'},
  {bussRegime:BUSSINES_REGIME.MYPE_TRIBUTARIO, bussRegimeName:'MYPE Tributario'}
 ]

 /*TIpo de libro  */
 export enum BUSSINES_KIND_BOOK{
    ELECTRONIC=1,
    COMPUTERIZED=2
 }
 
 export interface BussinesKindBook{
    bussKindBookAcc:number,
    bussKindBookAccName:string
  }

  export const DATA_BUSSINES_KIND_BOOK:BussinesKindBook[]=[
    {bussKindBookAcc:BUSSINES_KIND_BOOK.ELECTRONIC , bussKindBookAccName: 'Electronico' },
    {bussKindBookAcc:BUSSINES_KIND_BOOK.ELECTRONIC , bussKindBookAccName: 'Computarizado' }
  ]

/* */
 export enum BUSSINES_FILE_KIND{
    ARCHIVADOR=1, FOLDER=2
 }
 
 export interface BussinesFileKind{
    bussFileKind:number,
    bussFileKindName:string
  }

  export const DATA_BUSSINES_FILE_KIND:BussinesFileKind[]=[
    {bussFileKind:BUSSINES_FILE_KIND.ARCHIVADOR , bussFileKindName: 'Archivador' },
    {bussFileKind:BUSSINES_FILE_KIND.FOLDER , bussFileKindName: 'Folder' },
  ]







