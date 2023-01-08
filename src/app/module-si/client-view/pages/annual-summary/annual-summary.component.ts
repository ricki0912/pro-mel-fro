import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-annual-summary',
  templateUrl: './annual-summary.component.html',
  styleUrls: ['./annual-summary.component.scss'],
})
export class AnnualSummaryComponent implements OnInit {
  title = 'Ventas Anuales';
  showDescription = true;
  showDescriptionEdit = false;

  constructor() {}

  ngOnInit(): void {}

  showEditDescription() {
    this.showDescription = !this.showDescription;
    this.showDescriptionEdit = !this.showDescriptionEdit;
  }
}
