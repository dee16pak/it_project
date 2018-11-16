import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';

/**
 * Generated class for the OrderModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-modal',
  templateUrl: 'order-modal.html',
})
export class OrderModalPage {
order:any[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,private view: ViewController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderModalPage');
    this.order = this.navParams.get('data');
    console.log(this.order);
  }
  closeModal(){
    console.log("close");
    this.view.dismiss();
  }
}
