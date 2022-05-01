import { ParentInterface } from "../global/parents/parent.interface";

export enum CATEGORY_TYPES_AUTH{
  NEITHER= 1, DNI=2, RUC=3, ANYONE=4
}

export enum CATEGORY_LINK_BUS{
  YES=1, NO=2
}

export interface Category extends ParentInterface{
  catId?: number;
  catCode?: string;
  catName: string;
  catNameLong?:string;
  catDescription?: string;
  catTelReq?:number;
  catLinkBus?:number;
  catAuth?:number;
  catIdParent?:Number;
  hqId?:number;
}
  export interface CategoryTree extends Category{
  idParents?: number[];
  children?: CategoryTree[];
}

export interface FlatTreeControlCategory {
  expandable: boolean;
  /**atributos añadidos */
  catId :number;
  catName: string;
  catCode: string;
  catNameLong:string;
  idParents:any[];

  /*fin de atributos */
  selected:boolean;
  level: number;

}