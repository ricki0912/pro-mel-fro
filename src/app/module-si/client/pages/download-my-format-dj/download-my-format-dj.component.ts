import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { GlobalHelpers } from 'src/app/global/helpers/global.helpers';
import { BUSSINES_COLOR, BUSSINES_STATE } from 'src/app/interfaces/bussines';
import { Period } from 'src/app/interfaces/period';
import { PeriodService } from 'src/app/services/period.service';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-download-my-format-dj',
  templateUrl: './download-my-format-dj.component.html',
  styleUrls: ['./download-my-format-dj.component.scss'],
})
export class DownloadMyFormatDJComponent {
  loading: boolean = false;

  tellId: number | undefined;
  bussState: number = BUSSINES_STATE.ENABLE;
  prdsId: number = 0;
  month: number | undefined = MONTHS.find(
    (e) => e.id == GlobalHelpers.monthBefore().getMonth() + 1
  )?.id;

  MONTHS = MONTHS;
  BS = BUSSINES_STATE;

  public periods: Period[] = [];

  title = 'Formato de Declaración Jurada';
  constructor(
    private dialogRef: MatDialogRef<DownloadMyFormatDJComponent>,
    private periodService: PeriodService,
    private showMessage: ShowMessageService,
    private tokenStorage: TokenStorageService
  ) {
    this.tellId = this.tokenStorage.getTeller()?.tellId;
  }

  ngOnInit(): void {
    this.getDataPeriods();
  }

  getColorBussState(bussState?: string) {
    switch (Number(bussState)) {
      case BUSSINES_STATE.ENABLE:
        return BUSSINES_COLOR.ENABLE;
      case BUSSINES_STATE.SUSPENDED:
        return BUSSINES_COLOR.SUSPENDED;
      case BUSSINES_STATE.RETIRED:
        return BUSSINES_COLOR.RETIRED;
      default:
        return '';
    }
  }

  public openPDFNewWindow() {
    //window.open(environment.API_URL+`/v1/reports/my-format-dj-json`, );
    let params = {
      tellId: this.tellId,
      bussState: this.bussState,
      prdsId: this.prdsId,
      month: this.month,
    };
    /*GlobalHelpers.openWindowWithPost(
      environment.API_URL + `/v1/reports/my-format-declaration`,
      params
    );*/
    window.open(
      environment.API_URL +
        `/v1/reports/my-format-declaration?tellId=${this.tellId}&bussState=${this.bussState}&prdsId=${this.prdsId}&month=${this.month}`
    );
  }

  getDataPeriods(): boolean {
    this.loading = true;
    this.periodService.all().subscribe({
      next: (data) => {
        this.periods = data.data as Period[];
        let period = this.periods.find(
          (e) =>
            Number(e.prdsNameShort) == GlobalHelpers.monthBefore().getFullYear()
        );
        this.prdsId = period?.prdsId || 0;

        this.loading = false;
      },
      error: (error) => {
        this.showMessage.error({
          message: 'Al parecer surgio un error!. ' + error.message.message,
        });
      },
    });
    return false;
  }
}

export interface state {
  name: string;
  value: number;
}

interface Month {
  id: number;
  name: string;
}

const MONTHS: Month[] = [
  { id: 1, name: 'ENERO' },
  { id: 2, name: 'FEBRERO' },
  { id: 3, name: 'MARZO' },
  { id: 4, name: 'ABRIL' },
  { id: 5, name: 'MAYO' },
  { id: 6, name: 'JUNIO' },
  { id: 7, name: 'JULIO' },
  { id: 8, name: 'AGOSTO' },
  { id: 9, name: 'SETIEMBRE' },
  { id: 10, name: 'OCTUBRE' },
  { id: 11, name: 'NOVIEMBRE' },
  { id: 12, name: 'DICIEMBRE' },
];
