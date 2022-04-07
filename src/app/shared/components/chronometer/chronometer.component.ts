import { Component, Input, OnInit } from '@angular/core';


@Component({
    selector: 'app-chronometer',
    template:'{{nameLong}}',
    styleUrls: []
  })
  export class ChronometerComponent implements OnInit{
    
    @Input() elapsedSeconds: number = 0
  
    public hours: number = 0
    public minutes: number = 0
    public seconds: number = 0
    public nameLong:string='00:00:00'
    constructor() {
      
    }
  ngOnInit(): void {
    this.elapsedSeconds=Math.trunc(this.elapsedSeconds)
    this.hours=Math.floor(this.elapsedSeconds/3600);
      this.elapsedSeconds%= 3600;
      this.minutes = Math.floor(this.elapsedSeconds / 60);
      this.seconds = this.elapsedSeconds % 60;
  }
  
    tick=()=> {
      this.seconds++;
      if (this.seconds >= 60) {
        this.seconds = 0;
        this.minutes++;
        if (this.minutes >= 60) {
          this.minutes = 0;
          this.hours++;
        }
      }
    }
  
    toStringTimer=()=>{
      this.nameLong=(this.hours > 9 ? this.hours : "0" + this.hours)
      + ":" + (this.minutes > 9 ? this.minutes : "0" + this.minutes)
      + ":" + (this.seconds > 9 ? this.seconds : "0" + this.seconds);
    }
    timer=() =>{
      this.tick()
      this.toStringTimer()
    }
  
    public t:ReturnType<typeof setInterval>=setInterval(this.timer,1000)
  }