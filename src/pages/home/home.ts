import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MenuPage } from '../menu/menu';
import { CheckoutPage } from '../checkout/checkout';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
   open() {
    this.navCtrl.push(MenuPage);
  }
  


  gotoCheckout(){
    this.navCtrl.push(CheckoutPage)
  }
}
