import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';

import { Modal } from 'ionic-angular';

import { ModalController } from 'ionic-angular';
import { MenuModalPage } from '../menu-modal/menu-modal';
import { CartdataproviderProvider } from '../../providers/cartdataprovider/cartdataprovider';


@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})

export class MenuPage {
  myData = [];
  
  
  // shownGroup = null;
  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, private cart: CartdataproviderProvider) {

   

  }
  // isGroupShown(group) {
  //   return this.shownGroup === group;
  // }
  toggleGroup(j) {

    if (this.cart.groups[j].check == true) {
      this.cart.groups[j].check = false;
    }
    else
      this.cart.groups[j].check = true;
  }


  add_quantity(j, i) {
    // this.myData = this.cart.groups[j].items[i];
    // console.log(this.cart.groups[j].items[i]);

    this.cart.pos.i=j;
    this.cart.pos.j=i;
    const modal: Modal = this.modalCtrl.create(MenuModalPage, { data: this.cart.pos },{ cssClass: "modal-fullscreen" });

    modal.present();
    // modal.onDidDismiss((data) => {
    //   if(data!=null){
    //     this.cart.groups[j].items[i] = data;
    //     this.cart.list[this.cart.list.length]={
    //       menuindex:j,
    //       itemindex:i
    //     }
    //   }
    // })
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad MenuPage');
  }

}
