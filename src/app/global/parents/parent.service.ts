import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { ParentInterface ,InterfaceParamsResponse} from './parent.interface';

export abstract class ParentService {
    //protected readonly HOST_API='http://127.0.0.1:8000';
    protected readonly HOST_API='http://192.168.1.96:8000';
  
}
  
