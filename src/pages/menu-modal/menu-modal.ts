import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { CartdataproviderProvider } from '../../providers/cartdataprovider/cartdataprovider';
//import { listener } from '@angular/core/src/render3/instructions';


@IonicPage()
@Component({
  selector: 'page-menu-modal',
  templateUrl: 'menu-modal.html',
})
export class MenuModalPage {

  
 itemno;
  data={
    quantity:0,
  }
  constructor(public navCtrl: NavController, private navParams: NavParams, private view: ViewController, private cart:CartdataproviderProvider) {
    
  }

  addtocart(){
      this.cart.groups[this.cart.pos.i].items[this.cart.pos.j].quantity = this.data.quantity;
      this.cart.list[this.cart.list.length] ={
        i:this.cart.pos.i,
        j:this.cart.pos.j
      } 
  }
  closeModal(){
    console.log("close");
    this.cart.pos.i=0;
    this.cart.pos.j=0;
    this.view.dismiss();
  }
 
  ionViewDidLoad() {
    this.itemno = this.cart.groups[this.cart.pos.i].items[this.cart.pos.j].itemno;
    this.data.quantity = this.cart.groups[this.cart.pos.i].items[this.cart.pos.j].quantity;
  }
  add(){
    this.data.quantity = this.data.quantity + 1;
  }
  subtract(){
    if(this.data.quantity>0){
      this.data.quantity = this.data.quantity - 1;
    }
  }
  
}
