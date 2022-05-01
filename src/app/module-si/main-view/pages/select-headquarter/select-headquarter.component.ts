import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Headquarter } from 'src/app/interfaces/headquarter';
import { HeadquarterService } from 'src/app/services/headquarter.service';

@Component({
  selector: 'app-select-headquarter',
  templateUrl: './select-headquarter.component.html',
  styleUrls: ['./select-headquarter.component.scss']
})
export class SelectHeadquarterComponent implements OnInit {

  headquarters: Headquarter[] = []
  selectedHqId: number = 0
  constructor(
    private hqService: HeadquarterService,
    private activatedRoute: ActivatedRoute,
    private router:Router

  ) { }
  ngOnInit(): void {
    this.activateRoute()
    this.readHeadquarters()
  }
  private readHeadquarters() {
    this.hqService.all().subscribe({
      next: d => {
        this.headquarters = d.data as Headquarter[]
      }
    })
  }
  private activateRoute() {
    this.activatedRoute.params.subscribe((params) => {
      this.selectedHqId = parseInt(params['hqId'] || 0)
    })
  }
  public changeHeadquarter(){
    this.router.navigate([`si/${this.selectedHqId}`])

  }
}
