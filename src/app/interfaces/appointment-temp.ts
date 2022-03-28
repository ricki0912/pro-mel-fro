import { ParentInterface } from "../global/parents/parent.interface";

export interface AppointmentTemp extends ParentInterface {
    /*Para sacar cita*/
    apptmId?:number;
    apptmTicketCode?:string;
    apptmDateTimePrint?:Date; /*catCode+'01' */
    apptmSendFrom?:string; /*web, totem, whatsApp*/

    /*datos del cliente*/
    apptKindClient?:string;  /*P=Persona N=Negocio*/
    perId?:number;
    bussId?:number;

    /*EL nro de documento y nombre del cliente viaja a esta tabla para un acceso rapido*/
    apptmNumberDocClient?:string; /*RUC, DNI, ETC*/
    apptmNameClient?:string
    catId?:number;
    tellId?:number

    apptmNro?: number;/*NUmero de orden para ssacar cita por categoria */

    /*Transfer*/
    apptmTransfer?:number,
    apptmTel?:string,

    /*Posiblemente en la siguiente tabla original*/
    tellNameLong?:string;
    catNameLOng?:string

    /*atencion en ventanilla*/
    apptmState?: string, /*En espera, Atendido, Cancelado*/

}

