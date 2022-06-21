import { Clipboard } from '@angular/cdk/clipboard';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CopyToClipboard } from 'src/app/interfaces/copy-to-clipboard';
import { CopyToClipboardService } from 'src/app/services/copy-to-clipboard.service';

@Injectable({
  providedIn: 'root'
})
export class CopyService {
  
  constructor(
    private _clipboard: Clipboard,
    private _snackBar: MatSnackBar,
    private _copToClipboardService:CopyToClipboardService
  ) { }

  public copy( keyName:string, copiedWord?:string){
    if(copiedWord){
      this.copyToClipboard(copiedWord)
      this._snackBar.open('Se ha copiado '+copiedWord, 'Hecho',{duration:2000});
      const c:CopyToClipboard={ copiedWord, keyName}
      this._copToClipboardService.add(c).subscribe(
        {
          next:d=>{}
        }
      )
    }
  }
  private copyToClipboard(str:string) {
    const pending = this._clipboard.beginCopy(str);

      let remainingAttempts = 3;
      const attempt = () => {
        const result = pending.copy();
        if (!result && --remainingAttempts) {
          setTimeout(attempt);
        } else {
          // Remember to destroy when you're done!
          pending.destroy();
        }
      };
      attempt();
  }


}
