import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { CartdataproviderProvider } from '../../providers/cartdataprovider/cartdataprovider';
import { LocationProvider } from '../../providers/location/location';
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
    link: "",
    sub_name: ""
  }
  constructor(public locProd : LocationProvider ,public navCtrl: NavController, private navParams: NavParams, private view: ViewController, private cart:CartdataproviderProvider) {
    
  }

  addtocart(){
    
    this.cart.groups[this.cart.pos.i].itemlist[this.cart.pos.j].qty = this.data.quantity;
    this.cart.checkempty();
    this.closeModal();
  }
  closeModal(){
    console.log("close");
    this.cart.pos.i=-1;
    this.cart.pos.j=-1;
    this.view.dismiss();
  }
 
  ionViewDidLoad() {
    this.itemno = this.cart.groups[this.cart.pos.i].itemlist[this.cart.pos.j].item_name;
    this.data.quantity = this.cart.groups[this.cart.pos.i].itemlist[this.cart.pos.j].qty;
    this.data.link = this.cart.groups[this.cart.pos.i].itemlist[this.cart.pos.j].link;
    this.data.sub_name = this.cart.groups[this.cart.pos.i].itemlist[this.cart.pos.j].item_sub_name;
  }

  add(){
    
    this.data.quantity = this.data.quantity + 1;
  }

  subtract(){
    if(this.data.quantity > 0){
      this.data.quantity = this.data.quantity - 1;
    }
  }

}
