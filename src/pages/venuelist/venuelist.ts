import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { LocationProvider } from '../../providers/location/location';

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
  showLoading: boolean = false;
  showError: boolean = false;
  errorMsg: string = '';
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public locProd: LocationProvider) {}

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

    try {
      this.venueList = await this.getVenueNearLocation(loc);
    } catch(err) {
      this.error('Error while getting Venuelist', loading);
      return;
    }

    loading.dismiss();
    this.showLoading = false;
  }

  private error(errMsg, loading) {
    this.showError = true;
    this.errorMsg = errMsg;
    loading.dismiss();
    this.showLoading = false;
  }

  private showLoader(content) {
    let loading = this.loadingCtrl.create({
      content
    });
    loading.present();
    return loading;
  }

  private async getVenueNearLocation(loc) {
    //await new Promise((resolve, reject) => setTimeout(reject, 2000));
    return await new Promise<any[]>(resolve => setTimeout(() => {resolve(
      [
        {name : 'Dominos', menu_sub_list: ['Pizza', 'Desserts', 'Italian', 'Burgers'], thumbnail: 'assets/imgs/logo.png'},
        {name : 'Dominos', menu_sub_list: ['Pizza', 'Desserts', 'Italian', 'Burgers'], thumbnail: 'assets/imgs/logo.png'}
      ]
    )}, 1000));
  }



}
