import { Component, OnInit } from '@angular/core';
import { Bussines } from 'src/app/interfaces/bussines';
import { ClientViewService } from '../../client-view.service';

@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.scss']
})
export class GeneralInformationComponent implements OnInit {
  serBuss: Bussines | undefined;

  constructor(
    private clientViewService:ClientViewService

  ) {
    
   }

  ngOnInit(): void {
    this.listenSelectedBusiness(()=>{})
  }
  private listenSelectedBusiness(o:()=>void){
    this.clientViewService.getSelectedBussines().subscribe((b:Bussines | null)=>{
      if(b){
        this.serBuss=b;
        o();
    }
    })
  }

}
