import { Observable } from "rxjs";
import { ParentInterface, InterfaceParamsResponse } from "../parents/parent.interface";

export interface CrudApiInterface{
       add(object: ParentInterface):Observable<InterfaceParamsResponse<ParentInterface>> |Observable<ParentInterface> |null
      upd(id:number | string, object: ParentInterface):Observable<InterfaceParamsResponse<ParentInterface>> |Observable<ParentInterface> | null
      del(id:number|string):Observable<InterfaceParamsResponse<ParentInterface>> |null  
      all():Observable<InterfaceParamsResponse<ParentInterface>>| Observable<ParentInterface[]> | null
      find(id:number|string):Observable<ParentInterface> |null

}