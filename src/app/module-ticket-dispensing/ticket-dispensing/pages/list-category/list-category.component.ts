import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CrudInterface } from 'src/app/global/interfaces/crud.interface'
import { CategoryService } from 'src/app/services/category.service';
import { Category, CategoryTree, CATEGORY_LINK_BUS, CATEGORY_STATE } from 'src/app/interfaces/category'
import { CategoryHelpers } from 'src/app/global/helpers/category.helpers'
import { ThisReceiver } from '@angular/compiler';
import { AppointmentTempService } from 'src/app/services/appointment-temp.service';
import { AppointmentTemp } from 'src/app/interfaces/appointment-temp';
@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})

export class ListCategoryComponent implements OnInit {
  @Input() categoriesTreeSelected: CategoryTree[] = []
  @Output() onSendIdCategory =new EventEmitter<number>()

  CLB=CATEGORY_LINK_BUS
  CS=CATEGORY_STATE
  constructor(

  ) { }

  ngOnInit(): void {
  }
  
  public sendIdCategory(id:number){
    this.onSendIdCategory.emit(id)
  }
  

}

