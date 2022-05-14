import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { ParentInterface ,InterfaceParamsResponse} from './parent.interface';
import { environment } from '../../../environments/environment';

export abstract class ParentService {
    protected readonly HOST_API=environment.API_URL;
    //protected readonly HOST_API='http://192.168.1.96:8000';
  
}
  
