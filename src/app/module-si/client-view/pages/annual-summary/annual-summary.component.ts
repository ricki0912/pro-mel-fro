import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Bussines } from 'src/app/interfaces/bussines';
import { Period } from 'src/app/interfaces/period';
import { MainViewService } from 'src/app/module-si/main-view/main-view.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-annual-summary',
  templateUrl: './annual-summary.component.html',
  styleUrls: ['./annual-summary.component.scss'],
})
export class AnnualSummaryComponent implements OnInit {
  title = 'Ventas Anuales';

  var2 = true;

  periodOfTableEdit?: Period = undefined;
  periodOfTablePreview?: Period = undefined;
  bussines?: Bussines = undefined;

  constructor(
    private activate: ActivatedRoute,
    private mainViewService: MainViewService,
    @Inject(MAT_DIALOG_DATA)
    public paramsDialog: {
      hqId: number;
      bussId: number;
      prdsIdEdit: number;
      prdsIdPreview: number;
    }
  ) {}

  ngOnInit(): void {
    this.setParams(this.paramsDialog);

    console.log(this.paramsDialog);
    this.activate.params.subscribe((params) => {
      console.log('Estoy dentro jejeje', params['bussId']);
      //this.readCRUD(params['bussId']);
    });

    this.mainViewService.getParams().subscribe((p) => {
      console.log('Esto dentro de params', p['bussId']);

      //this.hqId = parseInt(p['hqId'] || 0);
      //c(this.hqId);
    });
  }

  setParams = (paramsDialog: {
    hqId: number;
    bussId: number;
    prdsIdEdit: number;
    prdsIdPreview: number;
  }) => {
    if (paramsDialog.prdsIdEdit) {
      this.periodOfTableEdit = { prdsId: paramsDialog.prdsIdEdit };
    }

    if (paramsDialog.prdsIdPreview) {
      this.periodOfTablePreview = { prdsId: paramsDialog.prdsIdPreview };
    }
    if (paramsDialog.bussId) {
      this.bussines = { bussId: paramsDialog.bussId, person: {} };
    }
  };

  public openPDFNewWindow() {
    window.open(
      environment.API_URL +
        `/v1/reports/annual-summary?bussId=${this.bussines?.bussId}&prdsIdPrevious=${this.periodOfTablePreview?.prdsId}&prdsIdCurrent=${this.periodOfTableEdit?.prdsId}`
    );
  }
}
