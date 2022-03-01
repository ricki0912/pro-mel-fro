import { ParentInterface } from "../global/parents/parent.interface";

export interface Category extends ParentInterface{
  catId?: Number;
  catCode?: string;
  catName: string;
  catNameLong?:string;
  catDescription?:string;
  catAuth?:string;
  catIdParent?:Number;
}
  export interface CategoryTree extends Category{
  idParents?:any[],
  children?:CategoryTree[]
}

export interface FlatTreeControlCategory {
  expandable: boolean;
  /**atributos añadidos */
  catId :Number;
  catName: string, 
  catCode:string,
  catNameLong:string,
  idParents:any[],
  //
  /*fin de atributos */
  selected:boolean
  level: number;
}