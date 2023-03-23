import { ParentInterface } from "../global/parents/parent.interface";

export interface Person extends ParentInterface{
    perId?: number,
    perKindDoc?: string,
    perNumberDoc?: string,
    perName?: string,
    perAddress?: string
    perTel?: string,
    perTel2?: string,
    perTel3?: string,
    perEmail?: string,
}

export enum PERSON_KIND_DOC{
    DNI=1, 
    FOREIGNER_CARD=2,
    PASSPORT=3,
}

export interface PersonKindDoc{
    perKindDoc:number;
    perKindDocName:string;
}



export const DATA_PERSON_KIND_DOC:PersonKindDoc[]=[
{perKindDoc: PERSON_KIND_DOC.DNI, perKindDocName: 'DNI'},
{perKindDoc: PERSON_KIND_DOC.FOREIGNER_CARD, perKindDocName: 'Carnet de Extranjeria'},
{perKindDoc: PERSON_KIND_DOC.PASSPORT, perKindDocName: 'Pasaporte'}    
]



