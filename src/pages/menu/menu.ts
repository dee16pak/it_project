import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
//import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';

import { Modal } from 'ionic-angular';
import { CheckoutPage } from '../checkout/checkout';

import { ModalController } from 'ionic-angular';
import { MenuModalPage } from '../menu-modal/menu-modal';
import { CartdataproviderProvider } from '../../providers/cartdataprovider/cartdataprovider';
import { ENV } from '../../env';
import { HttpClient } from '@angular/common/http';
import { OrderPage } from '../order/order';


@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})

export class MenuPage {
  myData = [];
  showLoading: boolean = false;
  showError: boolean = false;
  errorMsg: string = '';
  
  constructor( public loadingCtrl: LoadingController, public http: HttpClient,public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams,public cart: CartdataproviderProvider) {
  }
  ionViewDidLoad() {

    console.log('ionViewDidLoad MenuPage');
    this.refreshAndGetMenu();
  }
  
  async refreshAndGetMenu() {
    this.showError = false;
    this.showLoading = true;
    let loading = this.showLoader('Fetching menu for your selected location');

    let venue_name;
    try {
      venue_name = 'waah2';//TODO change here to add selected venue
    } catch(err) {
      this.error('Error while getting your Venue.', loading);
      return;
    }

    loading.dismiss();
    loading = this.showLoader('Fetching menu for your selected location');

    let list;
    try {
      list = await this.getMenu(venue_name);
     
    } catch(err) {
      console.log(err);
      this.error('Error while getting Menu', loading);
      return;
    }

    loading.dismiss();
    setTimeout(() => {
      console.log(list[0].group_name);
      if(list) this.cart.groups = list;
      this.showLoading = false;
      //console.log(this.cart.groups[0].group_name);
    }, 1000);
  }

  private error(errMsg, loading) {
    this.showError = true;
    this.errorMsg = errMsg;
    loading.dismiss();
    setTimeout(() => {
      this.showLoading = false;
    }, 1000);
  }

  private showLoader(content) {
    let loading = this.loadingCtrl.create({
      content
    });
    loading.present();
    return loading;
  }

  private async getMenu(venue_name) {
    console.log(venue_name);
    return this.http
      .get<any[]>(`${ENV.BACKEND_URL}/menu/FindMenu/${venue_name}`)
      .toPromise();
  }

  //old done checked
  toggleGroup(i) {
    if (this.cart.groups[i].check == true) {
      this.cart.groups[i].check = false;
    }
    else
      this.cart.groups[i].check = true;
  }


  add_quantity(i, j) {
    this.cart.pos.i=i;
    this.cart.pos.j=j;
    const modal: Modal = this.modalCtrl.create(MenuModalPage,0,{ cssClass: "modal-fullscreen" });

    modal.present();
  }

  gotoCheckout(){
    this.navCtrl.push(CheckoutPage);
  }
  
  gotoOrder(){
    this.navCtrl.push(OrderPage);
  }

}
