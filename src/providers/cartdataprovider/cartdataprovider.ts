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
   
     this.groups = [];
    }


  checkempty(){
    console.log("in true check")
     let p,q;
     this.checkt=false;

     for(p in this.groups){
         for(q in this.groups[p].itemlist){
           if(this.groups[p].itemlist[q].qty > 0){
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
