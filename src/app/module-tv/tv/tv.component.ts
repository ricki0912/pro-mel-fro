import { Component, OnInit } from '@angular/core';
import {LoadingService} from 'src/app/shared/components/loading/loading.service'

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss']
})
export class TVComponent implements OnInit {

  constructor(
    private serviceLoading:LoadingService 
  ) { }

  ngOnInit(): void {
    this.serviceLoading.hide()
  }

}

