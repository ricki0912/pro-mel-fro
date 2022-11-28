export interface DebtsAndPaids {
    bussId: number;
    bussState: string;
    bussStateDate:Date;
    tellId?: number;
    bussName: string;
    bussRUC: string;
    bussTel?: string;
    bussFileNumber?:number;
    prdsId?: number;
    svId?: number;
    ppayId?: number;
    spName?: string;
    spCost?: string;
    spDebt?: string;
    spPaid?: string;
}
