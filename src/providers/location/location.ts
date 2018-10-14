import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';
/*
  Generated class for the LocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationProvider {
  private lat: number;
  private long: number;
  constructor(private platform: Platform, public geolocation: Geolocation) {}

  private refreshLocation() {
    if(this.platform.is('core')) {//Dummy value for debugging on desktop browser.
      this.lat = 23;
      this.long = 54;
      return new Promise(resolve => setTimeout(() => resolve(), 3000));
    }

    return this.geolocation.getCurrentPosition().then(resp => {
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;
      return new Promise((resolve) => resolve());
    });
  }

  private _get() {
    return new Promise(resolve => resolve({
      lat: this.lat,
      long: this.long
    }));
  }

  get() {
    if(this.lat === undefined) {
      return this.refreshAndGet()
    }
    return this._get();
  }

  refreshAndGet() {
    return this.refreshLocation().then(() => {
      return this._get();
    });
  }

}
