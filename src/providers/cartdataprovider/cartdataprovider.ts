//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class CartdataproviderProvider {

  groups = [];
  list = [];
  pos = {
    i:0,
    j:0
  }
  checkt=false;
  constructor() {
    console.log('Hello CartdataproviderProvider Provider');
    for (var i = 0; i < 1; i++) {
      this.groups[i] = {
        name: i,
        check: false,
        items: [],

      };
      for (var j = 0; j < 3; j++) {
        this.groups[i].items[j] = {
          itemid: j,  
          itemno: j,
          quantity: 3,
          price:10,
          submenu:"sub mane"
        }

      }

    }
    console.log("hi");
    console.log(this.groups[0].name);
  }

}