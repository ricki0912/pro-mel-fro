import { ParentInterface } from "../global/parents/parent.interface";

export interface Person extends ParentInterface{
    perId?: number,
    perKindDoc?: string,
    perNumberDoc?: string,
    perName?: string,
    perAddress?: string
    perTel?: string,
    perEmail?: string,
}

