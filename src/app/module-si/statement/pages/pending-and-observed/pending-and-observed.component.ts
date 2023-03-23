import { Component } from '@angular/core';
import { StatementService } from 'src/app/services/statement.service';

@Component({
  selector: 'app-pending-and-observed',
  templateUrl: './pending-and-observed.component.html',
  styleUrls: ['./pending-and-observed.component.scss']
})
export class PendingAndObservedComponent {

  constructor(
    private statementService: StatementService
  ){

    
  }

  ngOnInit(): void {
    

  }

  

  
}
