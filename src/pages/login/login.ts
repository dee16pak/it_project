import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UserDataProvider } from '../../providers/user-data/user-data';

import { VenuelistPage } from '../venuelist/venuelist';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  isSignUp: boolean = false;
  user: any = undefined;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userDataProvider: UserDataProvider, public toastCtrl: ToastController) {
    this.user = {
      email: "",
      password: "",
      profile: {
        name: "",
        phone_number: "",
        gender: "male",
      },
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doSignUp(flag) {
    this.isSignUp = flag;
  }

  submitRequest() {
    console.log(this.user);
    if(this.isSignUp) {
      this.userDataProvider.signup(this.user)
      .then(() => {
        this.makeToast('Signup successfully.\n Login to continue.');
        this.isSignUp = false;
      })
      .catch(err => {
        this.makeToast('Error Occured, while signing up.');
        console.log(err);
      });
    } else {
      this.userDataProvider.login(this.user.email, this.user.password)
      .then(() => {
        this.navCtrl.setRoot(VenuelistPage);
      })
      .catch(err => {
        this.makeToast('Error Occured, while logging in.');
        console.log(err);
      });
    }
  }

  private makeToast(message) {
    this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom'
    }).present();
  }
}
