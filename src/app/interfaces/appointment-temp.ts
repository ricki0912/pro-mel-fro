import { ParentInterface } from "../global/parents/parent.interface";
import { Category } from "./category";
import { Teller } from "./teller";

export enum APPOINTMENT_STATE{
    PENDING=1, CURRENT_ATTENTION=2, ATTENDED=3
}

export interface AppointmentTemp extends ParentInterface {
    /*Para sacar cita*/
    apptmId?:number;
    apptmTicketCode?:string;
    apptmDateTimePrint?:Date; /*catCode+'01' */
    apptmSendFrom?:string; /*web, totem, whatsApp*/

    /*datos del cliente*/
    apptKindClient?:number;  /*2=Persona 1=Negocio*/
    perId?:number;
    bussId?:number;

    /*EL nro de documento y nombre del cliente viaja a esta tabla para un acceso rapido*/
    apptmNumberDocClient?:string; /*RUC, DNI, ETC*/
    apptmNameClient?:string;


     catId?:number;
     
    hqId?:number,
    tellId?:number
    catCode?:string;
    apptmNro?: number;/*NUmero de orden para ssacar cita por categoria */

    /*Transfer*/
    apptmTransfer?:number,
    apptmTel?:string,
    apptmEmail?:string,

    apptmComment?:string,
    /*Posiblemente en la siguiente tabla original*/
    tellNameLong?:string;
    catNameLOng?:string

    /*atencion en ventanilla*/
    apptmState?: number, /*En espera=1, En atención=2, Atendido=3, 4=no atendido 5=cancelado*/
    apptmNroCalls?:number,
    apptmDateStartAttention?:string,
    apptmDateFinishAttention?:string

    apptmScoreClient?:string, 
    apptmCommentClient?:string,
    apptmScoreDateClient?:string,

    


    apptmCommentDateClient?:string,

    teller?:Teller,
    category?:Category,

}

export interface TAppointmentTemp extends AppointmentTemp{
    elapsedSeconds:number,
    elapsedSecondsStartAttention:number
}

export enum APPOINTMENT_KIND_CLIENT {
    BUSINESS=1,
    PERSON=2
}


export enum APPOINTMENT_SEND_FROM {
    TICKET_DISPENSING='Totem',
    WEB='Web'
}

export interface ApptmState{
    apptmStateId:number,
    apptmStateName:string
}
