import { Component } from '@angular/core';
import { ModalController,IonicPage, NavController, LoadingController, NavParams } from 'ionic-angular';
import { ENV } from '../../env';
import { HttpClient } from '@angular/common/http';
import { Modal } from 'ionic-angular';
import { OrderModalPage } from '../order-modal/order-modal';

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
  constructor(public modalCtrl: ModalController,public navCtrl: NavController, public loadingCtrl: LoadingController, public http: HttpClient) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
  this.refreshAndGetShit();
  }

  private makeUrl(uri, session, addQueryString=true) {
    let url =  `${ENV.BACKEND_URL}${uri}`;
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
      if(list) this.orderList = list;
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
      .get<any[]>(this.makeUrl('/order/getOrders/12345678',null,false))
      .toPromise();

    //  return this.http.post(this.makeUrl('/order/orderRegisteration', null, false), {order : orders} ,  {}).toPromise();
  }
//model to show single order in details.
  openModal(order) {
      const orderc = order;
      const modal: Modal = this.modalCtrl.create(OrderModalPage,{ data:orderc });
  
      modal.present();
    }
  
}


/*
this.orderList = [
    {
      Venue : "Apna Dhabha",
      OrderNo : "10",
      bill : "500",
      status: 1,
      items :[
      {
        itemname: "Dal",
        submenu: "Yellow_Dal",
        quantity : 3,
        price : 270
      },
      {
        itemname: "Dal2",
        submenu: "Yellow_Dal2",
        quantity : 32,
        price : 2702
      }
            ]
    },
    {
      Venue : "Apna Dhabha",
      OrderNo : "10",
      bill : "500",
      status: 0,
      items :[
        {
          itemname: "Dal",
          submenu: "Yellow_Dal",
          quantity : 3,
          price : 270
        },
        {
          itemname: "Dal2",
          submenu: "Yellow_Dal2",
          quantity : 32,
          price : 2702
        }
              ]
    } 
    ,
    {
      Venue : "Apna Dhabha",
      OrderNo : "10",
      bill : "500",
      status: 0,
      items :[
        {
          itemname: "Dal",
          submenu: "Yellow_Dal",
          quantity : 3,
          price : 270
        },
        {
          itemname: "Dal2",
          submenu: "Yellow_Dal2",
          quantity : 32,
          price : 2702
        }
              ]
    } ,
    {
      Venue : "Apna Dhabha",
      OrderNo : "10",
      bill : "500",
      status: 0,
      items :[
        {
          itemname: "Dal",
          submenu: "Yellow_Dal",
          quantity : 3,
          price : 270
        },
        {
          itemname: "Dal2",
          submenu: "Yellow_Dal2",
          quantity : 32,
          price : 2702
        }
              ]
    } ,
    {
      Venue : "Apna Dhabha",
      OrderNo : "10",
      bill : "500",
      status: 0,
      items :[
        {
          itemname: "Dal",
          submenu: "Yellow_Dal",
          quantity : 3,
          price : 270
        },
        {
          itemname: "Dal2",
          submenu: "Yellow_Dal2",
          quantity : 32,
          price : 2702
        }
              ]
    } ,
    {
      Venue : "Apna Dhabha",
      OrderNo : "10",
      bill : "500",
      status: 0,
      items :[
        {
          itemname: "Dal",
          submenu: "Yellow_Dal",
          quantity : 3,
          price : 270
        },
        {
          itemname: "Dal2",
          submenu: "Yellow_Dal2",
          quantity : 32,
          price : 2702
        }
              ]
    } ,
    {
      Venue : "Apna Dhabha",
      OrderNo : "10",
      bill : "500",
      status: 0,
      items :[
        {
          itemname: "Dal",
          submenu: "Yellow_Dal",
          quantity : 3,
          price : 270
        },
        {
          itemname: "Dal2",
          submenu: "Yellow_Dal2",
          quantity : 32,
          price : 2702
        }
              ]
    } ,
    {
      Venue : "Apna Dhabha",
      OrderNo : "10",
      bill : "500",
      status: 0,
      items :[
        {
          itemname: "Dal",
          submenu: "Yellow_Dal",
          quantity : 3,
          price : 270
        },
        {
          itemname: "Dal2",
          submenu: "Yellow_Dal2",
          quantity : 32,
          price : 2702
        }
              ]
    } ,
    {
      Venue : "Apna Dhabha",
      OrderNo : "10",
      bill : "500",
      status: 0,
      items :[
        {
          itemname: "Dal",
          submenu: "Yellow_Dal",
          quantity : 3,
          price : 270
        },
        {
          itemname: "Dal2",
          submenu: "Yellow_Dal2",
          quantity : 32,
          price : 2702
        }
              ]
    } ,
    {
      Venue : "Apna Dhabha",
      OrderNo : "10",
      bill : "500",
      status: 0,
      items :[
        {
          itemname: "Dal",
          submenu: "Yellow_Dal",
          quantity : 3,
          price : 270
        },
        {
          itemname: "Dal2",
          submenu: "Yellow_Dal2",
          quantity : 32,
          price : 2702
        }
              ]
    } 
   ]
  }*/
