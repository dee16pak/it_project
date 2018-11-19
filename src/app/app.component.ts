import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController, ModalController, LoadingController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { VenuelistPage } from '../pages/venuelist/venuelist';
//import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { UserProfileModalPage } from '../pages/user-profile-modal/user-profile-modal';

import { UserDataProvider } from '../providers/user-data/user-data';
import { LocationProvider } from '../providers/location/location';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = null;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public userDataProvider: UserDataProvider, public toastCtrl: ToastController, public modalCtrl: ModalController, public locProd: LocationProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: VenuelistPage, icon: 'md-home' },
      // { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.getLocationBeforeLoginCheck();
    });
  }

  getLocationBeforeLoginCheck() {
    let loading = this.showLoader('Fetching your Location');
    return this.locProd.refreshAndGet()
    .then(() => {
      loading.dismiss();
      this.checkLogin();
    })
    .catch(err => {
      this.alertCtrl.create({
        title: 'Error!',
        subTitle: 'App needs your location to work! Please make sure your have GPS enabled!!',
        buttons: [
          {
            text: 'Exit App',
            handler: () => {
              console.log('Disagree clicked');
              this.platform.exitApp(); // stops the app
              window.close();
            }
          },
          {
            text: 'Ok',
            handler: () => {
              this.getLocationBeforeLoginCheck();
              console.log('Agree clicked');
            }
          }
        ]
      }).present();
      loading.dismiss();
    });
  }

  private showLoader(content) {
    let loading = this.loadingCtrl.create({
      content
    });
    loading.present();
    return loading;
  }

  checkLogin() {
    this.userDataProvider.checkLogin().then(() => {
      this.nav.setRoot(VenuelistPage);
      this.statusBar.show();
      this.splashScreen.hide();
      console.log("init logged in already");
    }).catch(err => {
      this.statusBar.show();
      this.splashScreen.hide();
      this.nav.setRoot(LoginPage);
      console.log("init not logged in already");
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
