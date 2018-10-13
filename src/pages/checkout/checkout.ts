import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  orderList: any[] = [];
  total: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.orderList = [
      { cat: '1', name: 'Dal', sub_name: ['Half plate'], price: 120, qty: 2 },
      { cat: '2', name: 'Paneer', sub_name: ['Full plate'], price: 180, qty: 3 },
      { cat: '3', name: 'Roti', sub_name: ['atta'], price: 30, qty: 3 },

      { cat: '3', name: 'Roti', sub_name: ['atta'], price: 30, qty: 3 },
      { cat: '3', name: 'Roti', sub_name: ['atta'], price: 30, qty: 3 },
      { cat: '3', name: 'Roti', sub_name: ['atta'], price: 30, qty: 3 },
      { cat: '3', name: 'Roti', sub_name: ['atta'], price: 30, qty: 3 },
      { cat: '3', name: 'Roti', sub_name: ['atta'], price: 30, qty: 3 },
      { cat: '3', name: 'Roti', sub_name: ['atta'], price: 30, qty: 3 },
      { cat: '3', name: 'Roti', sub_name: ['atta'], price: 30, qty: 3 },
      { cat: '3', name: 'Roti', sub_name: ['atta'], price: 30, qty: 3 },
      { cat: '3', name: 'Roti', sub_name: ['atta'], price: 30, qty: 3 },
      { cat: '3', name: 'Roti', sub_name: ['atta'], price: 30, qty: 3 },
      { cat: '3', name: 'Roti', sub_name: ['atta'], price: 30, qty: 3 },
      { cat: '3', name: 'Roti', sub_name: ['atta'], price: 30, qty: 3 },
      { cat: '3', name: 'Roti', sub_name: ['atta'], price: 30, qty: 3 },
      { cat: '3', name: 'Roti', sub_name: ['atta'], price: 30, qty: 3 },
      { cat: '3', name: 'Roti', sub_name: ['atta'], price: 30, qty: 3 },
      { cat: '3', name: 'Roti', sub_name: ['atta'], price: 30, qty: 3 },
      { cat: '3', name: 'Roti', sub_name: ['atta'], price: 30, qty: 3 }


    ];
    this.total = 0.0;
  }
  totalcal() {
    this.total = 0.0;
    for (let i = 0; i < this.orderList.length; i++) {
      this.total = (this.orderList[i].price * this.orderList[i].qty) + this.total;
    }
  } sub(order) {
    console.log(order.name);
    for (let i = 0; i < this.orderList.length; i++) {
      if (this.orderList[i].cat == order.cat) {
        this.orderList[i].qty = this.orderList[i].qty - 1;
        this.totalcal();
      }

    }
    console.log(order.qty);

  }

  add(order) {
    console.log(order.name);
    for (let i = 0; i < this.orderList.length; i++) {
      if (this.orderList[i].cat == order.cat) {
        this.orderList[i].qty = this.orderList[i].qty + 1;
        this.totalcal();
      }

    }
    console.log(order.qty);

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
    for (let i = 0; i < this.orderList.length; i++) {
      this.total = (this.orderList[i].price * this.orderList[i].qty) + this.total;
    }
  }

  finish(fin_amt) {
    console.log(fin_amt);
  }
}
