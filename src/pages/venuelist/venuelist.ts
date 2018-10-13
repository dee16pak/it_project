import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VenuelistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-venuelist',
  templateUrl: 'venuelist.html',
})
export class VenuelistPage {

  venueList: any[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.venueList = [
      {name : 'Dominos', menu_sub_list: ['Pizza', 'Desserts', 'Italian', 'Burgers'], thumbnail: 'assets/imgs/logo.png'},
      {name : 'Dominos', menu_sub_list: ['Pizza', 'Desserts', 'Italian', 'Burgers'], thumbnail: 'assets/imgs/logo.png'}
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VenuelistPage');
  }



}
