export interface LastPayment {
    bussId: number;
    bussState: string;
    tellId: number;
    bussName: string;
    bussRUC: string;
    bussTel?: string;
    bussFileNumber: number;
    payId: number;
    payToken: string;
    paySerie: string;
    payNumber: number;
    payDatePrint: Date;
    prdsId: number;
    spName: string;
    svId: number;
    ppayId: number;
    spCost: number;
    spDebt: number;
    spPaid: number;
}
