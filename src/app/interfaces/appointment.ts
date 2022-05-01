
import { AppointmentTemp } from "./appointment-temp";

export interface Appointment extends AppointmentTemp {
    tellName?:string,
    tellCode?:string,

    /*fields with category */
    catNameLong:string,

    /*fields with user*/
    userId:string, 
    perName:string
}
