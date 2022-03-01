import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { ParentInterface ,ParentInterfaceParams} from './parent.interface';

export abstract class ParentService {
    protected readonly HOST_API='http://127.0.0.1:8000';
    public abstract  add(object: ParentInterface):Observable<ParentInterfaceParams<ParentInterface>> |Observable<ParentInterface> |null
    public abstract upd(id:number | string, object: ParentInterface):Observable<ParentInterfaceParams<ParentInterface>> |Observable<ParentInterface> | null
    public abstract del(id:number|string):Observable<ParentInterfaceParams<ParentInterface>> |null  
    public abstract all():Observable<ParentInterfaceParams<ParentInterface>>| Observable<ParentInterface[]> | null
    public abstract find(id:number|string):Observable<ParentInterface> |null

  
}
  
