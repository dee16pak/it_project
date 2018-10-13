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
  
  
  
  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, private cart: CartdataproviderProvider) {

    
   

  }
 
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

  ionViewDidLoad() {

    console.log('ionViewDidLoad MenuPage');
  }
  checkout(){
    console.log("checkout");
  }

}
