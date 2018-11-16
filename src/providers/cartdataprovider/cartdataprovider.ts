//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class CartdataproviderProvider {

  groups:any;
  // list = [];
   pos = {
     i:0,
     j:0
   }
  checkt=false;
  constructor() {
    console.log('Hello CartdataproviderProvider Provider');
   
     this.groups = [
      {
          _id: "5bed4f91e0e05540d229f317",
          group_name: "dal2",
          check: false,
          itemlist: [
              {
                  qty: 0,
                  item_name: "dal2",
                  item_sub_name: "pane",
                  price: 10,
                  link: "looasldl"
              }
          ],
          venue: "waah2",
          creationtime: "2018-11-15T10:50:57.131Z",
          __v: 0
      },
      {
          _id: "5bed4fb2e0e05540d229f318",
          group_name: "dal3",
          check: false,
          itemlist: [
              {
                  qty: 0,
                  item_name: "dal3",
                  item_sub_name: "pane",
                  price: 10,
                  link: "looasldl"
              }
          ],
          venue: "waah2",
          creationtime: "2018-11-15T10:51:30.896Z",
          __v: 0
      }
  ];
  
   
    // for (var i = 0; i < 1; i++) {
    //   this.groups[i] = {
    //     //gid
    //     name: i,//remove
    //     //groupname
    //     check: false,
    //     items: [],

    //   };
    //   for (var j = 0; j < 3; j++) {
    //     this.groups[i].items[j] = {
    //      //itemid
    //       itemid: j, 
    //       //item name 
    //       itemno: j,
    //       quantity: 3,
    //       price:10,
    //       submenu:"sub mane"
    //     }

    //   }

    // }
   // console.log("hi");
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
