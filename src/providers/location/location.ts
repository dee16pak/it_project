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

  private async refreshLocation() {
    if(this.platform.is('core')) {//Dummy value for debugging on desktop browser.
      this.lat = 23;
      this.long = 54;
      //await new Promise((resolve, reject) => setTimeout(reject, 2000));
      await new Promise(resolve => setTimeout(resolve, 2000));
    } else {
      const resp = await this.geolocation.getCurrentPosition();
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;
    }
  }

  private async _get() {
    return {
      lat: this.lat,
      long: this.long
    };
  }

  async get() {
    try {
      if(this.lat === undefined) {
        return await this.refreshAndGet()
      }
      return await this._get();
    } catch(err) {
      throw new Error(err);
    }
  }

  async refreshAndGet() {
    try {
      await this.refreshLocation();
      return await this._get();
    } catch(err) {
      throw new Error(err);
    }
  }

}