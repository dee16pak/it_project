import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

import { MenuPage } from '../menu/menu';
import { CheckoutPage } from '../checkout/checkout';
import { VenuelistPage } from '../venuelist/venuelist';
import { LocationProvider } from '../../providers/location/location';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  lat:any = undefined;
  long:any = undefined;
  constructor(public navCtrl: NavController, public location: LocationProvider,private platform: Platform) {

  }
   open() {
    this.navCtrl.push(MenuPage);
  }
  
  ionViewDidLoad() {
    console.log(this.platform)
      this.location.refreshAndGet()
        .then(loc => {
          console.log(loc);
          this.lat = loc.lat;
          this.long = loc.long;
        })
  }


  gotoCheckout(){
    this.navCtrl.push(CheckoutPage);
  }
  gotoVenuelist(){
    this.navCtrl.push(VenuelistPage);
  }

}
