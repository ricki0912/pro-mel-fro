import { Category, CategoryTree } from "src/app/interfaces/category";

export class GlobalHelpers{

    static subString(s:string, length:number){
        let r=s
        if(s && s.length>length){
          r=s.substring(0, length)+'...'
        }
        return r
    }

   


}