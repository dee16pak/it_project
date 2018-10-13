//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class CartdataproviderProvider {

  groups = [];
  list = [];
  pos = {
    i:-1,
    j:-1
  }
  checkt=false;
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
          quantity: 0,
          price:1,
          submenu:0
        }

      }

    }
    console.log("hi");
    console.log(this.groups[0].name);
  }

  checkempty(){
     let p,q;
     this.checkt=false;
     for(p in this.groups){
         for(q in this.groups[p].items){
           if(this.groups[p].items[q].quantity > 0){
             this.checkt=true;
             break;
           }
         }
         if(this.checkt==true){
           break;
         }
     }
  }

}
