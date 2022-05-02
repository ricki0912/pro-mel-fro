import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.scss']
})
export class ClientViewComponent implements OnInit, OnDestroy {

  constructor(
    private location : Location,
    private activate : ActivatedRoute,
    private fb: FormBuilder,
    public mediaObserver: MediaObserver
  ) { }
  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }

  ngOnInit(): void {
    this.activate.params.subscribe((params)=>{
      console.log("PAMRAMETROS DE CLIENT VIEW", params['bussId']);

    })
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      let mqAlias: string = String(result.mqAlias);
      this.cols = this.gridByBreakpoint[mqAlias];
    })
  }

  cols: number = 2;
  gridByBreakpoint: GridResponsive = {
    xl: 2,
    lg: 2,
    md: 2,
    sm: 2,
    xs: 1
  }
  mediaSub!: Subscription;

}

interface GridResponsive {
  [key: string]: number
}
