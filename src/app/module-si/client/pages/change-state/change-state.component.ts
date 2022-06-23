import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-state',
  templateUrl: './change-state.component.html',
  styleUrls: ['./change-state.component.scss']
})
export class ChangeStateComponent implements OnInit {

  title = "Seleccionar Estado";

  constructor() { }

  ngOnInit(): void {
  }

  favoriteSeason: string = "";
  seasons: string[] = ['Activo', 'Suspendido', 'Retirado'];

}
