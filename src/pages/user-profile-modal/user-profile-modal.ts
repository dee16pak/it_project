import { Component } from '@angular/core';
import { Platform, ViewController, IonicPage, NavParams } from 'ionic-angular';

/**
 * Generated class for the UserProfileModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-profile-modal',
  templateUrl: 'user-profile-modal.html',
})
export class UserProfileModalPage {  //LOAD PROFILE using user-provider
  
  character;
  
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    
    this.character = {
      name: 'Gollum',
      quote: 'Sneaky little hobbitses!',
      image: 'assets/img/avatar-gollum.jpg',
      items: [
        { title: 'Race', note: 'Hobbit' },
        { title: 'Culture', note: 'River Folk' },
        { title: 'Alter Ego', note: 'Smeagol' }
      ]
    };
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}