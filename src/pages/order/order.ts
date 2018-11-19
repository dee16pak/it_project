import { Component } from '@angular/core';
import { ModalController,IonicPage, NavController, LoadingController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Modal } from 'ionic-angular';
import { OrderModalPage } from '../order-modal/order-modal';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { LocationProvider } from '../../providers/location/location';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  orderList: any[] = [];
  showLoading: boolean = false;
  showError: boolean = false;
  errorMsg: string = '';
  constructor(public locProd : LocationProvider ,public user :UserDataProvider,public modalCtrl: ModalController,public navCtrl: NavController, public loadingCtrl: LoadingController, public http: HttpClient) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
  this.refreshAndGetShit();
  }

  private makeUrl(uri, session, addQueryString=true) {
    let url =  `${this.locProd.ip}${uri}`;
    if(addQueryString) {
      url += `?email=${session.email}&sid=${session.sid}`;
    }
    return url;
  }

  async refreshAndGetShit() {
    this.showError = false;
    this.showLoading = true;
    let loading = this.showLoader('Fetching your Orders');

   
    let list;
    try {
      list = await this.getOrders();
    } catch(err) {
      this.error('Error while getting Order List', loading);
      return;
    }
    loading.dismiss();
    setTimeout(() => {
      if(list) this.orderList = list.reverse();
      this.showLoading = false;
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

  private async getOrders() {
    return this.http
      .get<any[]>(this.makeUrl(`/order/getOrders/${this.user.getUserId()}`,null,false))
      .toPromise();

    //  return this.http.post(this.makeUrl('/order/orderRegisteration', null, false), {order : orders} ,  {}).toPromise();
  }
//model to show single order in details.
  openModal(order) {
      const orderc = order;
      const modal: Modal = this.modalCtrl.create(OrderModalPage,{ data:orderc },{ cssClass: "modal-fullscreen" });
  
      modal.present();
    }
  
}

