import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { LocationProvider } from '../../providers/location/location';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { HttpClient } from '@angular/common/http';
import { LoginPage } from '../login/login';

/**
 * Generated class for the VenuelistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const SEARCH_RADIUS_IN_MILES = 0.3106856;//0.5KM in miles

@IonicPage()
@Component({
  selector: 'page-venuelist',
  templateUrl: 'venuelist.html',
})
export class VenuelistPage {
  venueList: any[] = [];
  showLoading: boolean = false;
  showError: boolean = false;
  errorMsg: string = '';
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public http: HttpClient, public locProd: LocationProvider, public userProd: UserDataProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad VenuelistPage');
    this.refreshAndGetShit();
  }

  async refreshAndGetShit() {
    this.showError = false;
    this.showLoading = true;
    let loading = this.showLoader('Fetching your Location');

    let loc;
    try {
      loc = await this.locProd.refreshAndGet();
    } catch(err) {
      this.error('Error while getting your Location.', loading);
      return;
    }

    loading.dismiss();
    loading = this.showLoader('Fetching Venues near your Location');

    let list;
    try {
      list = await this.getVenueNearLocation(loc);
    } catch(err) {
      if(this.userProd.hasAuthFailed(err)) {
        setTimeout(() => this.navCtrl.setRoot(LoginPage), 1500);
      }
      this.error('Error while getting Venuelist', loading);
      return;
    }

    loading.dismiss();
    setTimeout(() => {
      if(list) this.venueList = list;
      this.showLoading = false;
    }, 1000);
  }

  private error(errMsg, loading) {
    this.showError = true;
    this.errorMsg = errMsg;
    loading.dismiss();
    setTimeout(() => {
      this.showLoading = false;
    }, 1000);
  }

  private showLoader(content) {
    let loading = this.loadingCtrl.create({
      content
    });
    loading.present();
    return loading;
  }

  private async getVenueNearLocation(loc) {
    return this.http
      .get<any[]>(this.userProd.makeUrl(`/venue/getNearby/${loc.lat}/${loc.long}/${SEARCH_RADIUS_IN_MILES}`, null, true, true))
      .toPromise();
  }
}
