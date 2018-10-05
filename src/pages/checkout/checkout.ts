import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

 
 
 
 
  orderList: any[] = [];
  total : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.orderList = [
      {cat : '1', name : 'Dal', sub_name: ['Half plate'], price: 120, qty : 2},
      {cat : '1', name : 'Paneer', sub_name: ['Full plate'], price: 180, qty : 3},
      {cat : '2', name : 'Roti', sub_name: ['atta'], price: 30, qty : 3}
      
    ];
    this.total = 0.0;
  }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
    for(let i = 0 ; i<this.orderList.length;i++){
      this.total = (this.orderList[i].price * this.orderList[i].qty) + this.total;
    }
  }

}
