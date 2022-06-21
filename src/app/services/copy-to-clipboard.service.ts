import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InterfaceParamsResponse } from '../global/parents/parent.interface';
import { ParentService } from '../global/parents/parent.service';
import { CopyToClipboard } from '../interfaces/copy-to-clipboard';

@Injectable({
  providedIn: 'root'
})
export class CopyToClipboardService extends ParentService{

  private API_COPY_TO_CLIPBOARD = `${this.HOST_API}/api/v1/copy-to-clipboard`
  constructor(private https: HttpClient) {
    super()
  }
  public add(object: CopyToClipboard): Observable<InterfaceParamsResponse<CopyToClipboard>> {
    return this.https.post<InterfaceParamsResponse<CopyToClipboard>>(`${this.API_COPY_TO_CLIPBOARD}`, object);
  }

}
