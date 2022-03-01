

import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, OnInit} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

interface FoodNode {
  name: string;
  count: number;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    count:0,
    children: [
      {name: 'Apple', count: 10},
      {name: 'Banana', count: 20},
      {name: 'Fruit loops', count: 30},
    ]
  }, {
    name: 'Vegetables',
    count:0,
    children: [
      {
        name: 'Green',
        count:0,
        children: [
          {name: 'Broccoli', count: 10},
          {name: 'Brussel sprouts', count: 20},
        ]
      }, {
        name: 'Orange',
        count:0,
        children: [
          {name: 'Pumpkins', count: 30},
          {name: 'Carrots', count: 40},
        ]
      },
    ]
  },
];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  count: number;

  level: number;
}

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-teller',
  templateUrl: './teller.component.html',
  styleUrls: ['./teller.component.scss']
})
export class TellerComponent implements OnInit {



  ngOnInit(): void {
  }

  displayedColumns: string[] = ['name', 'count','option'];
  
  private transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      count: node.count,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this.transformer, node => node.level, 
      node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */