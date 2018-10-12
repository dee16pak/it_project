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
  constructor() {
    console.log('Hello CartdataproviderProvider Provider');
    for (var i = 0; i < 10; i++) {
      this.groups[i] = {
        name: i,
        check: false,
        items: [],

      };
      for (var j = 0; j < 3; j++) {
        this.groups[i].items[j] = {
          itemno: j,
          quantity: 0
        }

      }

    }
    console.log("hi");
    console.log(this.groups[0].name);
  }

}
