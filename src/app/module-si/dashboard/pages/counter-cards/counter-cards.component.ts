import { Component, OnInit } from '@angular/core';
import { CounterCard } from 'src/app/interfaces/dashboard';
import { MainViewService } from 'src/app/module-si/main-view/main-view.service';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-counter-cards',
  templateUrl: './counter-cards.component.html',
  styleUrls: ['./counter-cards.component.scss']
})
export class CounterCardsComponent implements OnInit {
  private hqId:number=0
  counterCards:CounterCard[]=[]
  constructor(
    private dashboardService:DashboardService,
    private mainViewService:MainViewService
  ) { }

  ngOnInit(): void {
    this.listenRoute(o=>this.getCounterCards(o))
  }
  private listenRoute(c:(o:any)=>void){
    this.mainViewService.getParams().subscribe(p=>{
      this.hqId=parseInt(p['hqId'] || 0)
      c(this.hqId)
    })
  }

  private getCounterCards(hqId:number){
    this.dashboardService.getCounterCards(hqId).subscribe({
      next: d=>{
        this.counterCards=d.data as CounterCard[]
      }, error:e=>{

      }
    })
  }




}

