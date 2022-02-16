import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

export class ParentService {

    protected readonly HOST_API='http://127.0.0.1:8000';
  }
  