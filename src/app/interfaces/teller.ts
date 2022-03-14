import { ParentInterface } from "../global/parents/parent.interface";

export interface Teller extends ParentInterface{
  tellId?: Number;
  tellCode?: string;
  tellName: string;
  tellMaxInWait?:number;
  tellState?: number;
  hqId?:number;
  userId?:number;
}
