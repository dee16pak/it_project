import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
//import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { UserProfileModalPage } from '../pages/user-profile-modal/user-profile-modal';

import { UserDataProvider } from '../providers/user-data/user-data';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public userDataProvider: UserDataProvider, public toastCtrl: ToastController, public modalCtrl: ModalController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      // { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.splashScreen.show();
      this.userDataProvider.checkLogin().then(() => {
        this.nav.setRoot(HomePage);
        //this.nav.setRoot(HomePage);
        setTimeout(() => {
          this.statusBar.styleDefault();
          this.splashScreen.hide();
        }, 2000);
        console.log("init logged in already");
      }).catch(err => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        this.nav.setRoot(LoginPage);
        console.log("init not logged in already");
      });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.userDataProvider.logout()
    .then(() => {
      this.nav.setRoot(LoginPage);
    })
    .catch(err => {
      this.toastCtrl.create({
        message: 'Error Occured, while logging out.',
        duration: 3000,
        position: 'bottom'
      }).present();
      console.log(err);
    });
  }

  openProfileModal() {
    let modal = this.modalCtrl.create(UserProfileModalPage);
    modal.present();
  }
  
  isLoggedIn() {
    return this.userDataProvider.isUserLoggedIn();
  }
}
