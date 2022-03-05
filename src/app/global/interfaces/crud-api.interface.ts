import { Observable } from "rxjs";
import { ParentInterface, ParentInterfaceParams } from "../parents/parent.interface";

export interface CrudApiInterface{
       add(object: ParentInterface):Observable<ParentInterfaceParams<ParentInterface>> |Observable<ParentInterface> |null
      upd(id:number | string, object: ParentInterface):Observable<ParentInterfaceParams<ParentInterface>> |Observable<ParentInterface> | null
      del(id:number|string):Observable<ParentInterfaceParams<ParentInterface>> |null  
      all():Observable<ParentInterfaceParams<ParentInterface>>| Observable<ParentInterface[]> | null
      find(id:number|string):Observable<ParentInterface> |null

}