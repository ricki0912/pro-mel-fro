import { Injectable } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import { Observable } from 'rxjs';

@Injectable()
export class MainViewService {
  private hqId:number =0
  constructor(
    private activatedRoute:ActivatedRoute
  ) { 
  }
  getParams(): Observable<Params> {
    return this.activatedRoute.params;
  }
}
