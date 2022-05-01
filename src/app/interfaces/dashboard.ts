import { ParentInterface } from "../global/parents/parent.interface";
export interface CounterCard extends ParentInterface{
    title:string,
    class:string,
    total:number,
    subTitle:string,
    subTotal:number,
    icon:string
  }
  