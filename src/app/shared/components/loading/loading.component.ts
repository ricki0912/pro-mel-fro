import { Component, HostListener, OnInit } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  noCall=1;
  constructor(private loadingService: LoadingService) { }
  
  ngOnInit(): void {
    this.loadingService.changeState.subscribe((n)=>{this.noCall+=(n)})
    this.loadingService.changeStop.subscribe((n)=>{this.noCall=0 })
  }


}
