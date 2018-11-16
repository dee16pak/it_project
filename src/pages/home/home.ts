import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MenuPage } from '../menu/menu';
import { CheckoutPage } from '../checkout/checkout';
import { OrderPage } from '../order/order';

import { VenuelistPage } from '../venuelist/venuelist';
import { LocationProvider } from '../../providers/location/location';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  lat:any = undefined;
  long:any = undefined;
  constructor(public navCtrl: NavController, public location: LocationProvider) {}

  open() {
    this.navCtrl.push(MenuPage);
  }
  
  async ionViewDidLoad() {
    let loc;
    try {
      loc = await this.location.refreshAndGet();
    } catch(err) {
      return;
    }
    this.lat = loc.lat;
    this.long = loc.long;
  }

  gotoCheckout(){
    this.navCtrl.push(CheckoutPage);
  }

  gotoVenuelist(){
    this.navCtrl.push(VenuelistPage);
  }
  gotoOrder(){
    this.navCtrl.push(OrderPage);
  }
}