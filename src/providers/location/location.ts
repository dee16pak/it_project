import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform, ToastController, AlertController } from 'ionic-angular';
import { ENV } from '../../env';
/*
  Generated class for the LocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationProvider {
  private lat: number;
  private long: number;
  public ip:string;
  public web_ip:string;

  public promptPromise: any;

  constructor(private platform: Platform, public geolocation: Geolocation, public toastCtrl: ToastController, public alertCtrl: AlertController) {}

  private async refreshLocation() {
    if(this.platform.is('core')) {//Dummy value for debugging on desktop browser.
      // this.lat = 26.5064511;
      // this.long = 80.2261798;
      //await new Promise((resolve, reject) => setTimeout(reject, 2000));
      //await new Promise(resolve => setTimeout(resolve, 2000));
      await new Promise((resolve, reject) => {
        this.promptPromise = {
          resolve,
          reject
        };
        this.getTestLatLong();
      });
    } else {
      const resp = await this.geolocation.getCurrentPosition();
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;
    }
    console.log("find ip");
      this.findIp();
      this.toastCtrl.create({
        message: `Selected IP: ${this.ip} # ${this.web_ip}`,
        duration: 3000,
        position: 'bottom'
      }).present();
  }

  private getTestLatLong() {
    this.alertCtrl.create({
      title: 'Testing',
      message: "Enter Lat, Long for Testing.",
      inputs: [
        {
          name: 'Lat',
          placeholder: '26.5064511'
        },
        {
          name: 'Long',
          placeholder: '80.2261798'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
            this.promptPromise.reject();
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.lat = data.Lat;
            this.long = data.Long;
            console.log(data);
            this.promptPromise.resolve();
          }
        }
      ]
    }).present();
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
  findIp(){
    if(this.lat>=ENV.ENV_LAT && this.long<=ENV.ENV_LONG){
      console.log("NORTHWEST_URL");
      this.ip = ENV.NORTHWEST_URL;
      this.web_ip = ENV.WEB_NORTHWEST_URL;
    }else if(this.lat<ENV.ENV_LAT && this.long < ENV.ENV_LONG){
      console.log("SOUTHWEST_URL");
      this.ip = ENV.SOUTHWEST_URL;
      this.web_ip = ENV.WEB_SOUTHWEST_URL;
    }else if(this.lat>ENV.ENV_LAT && this.long > ENV.ENV_LONG){
      console.log("NORTHEAST_URL");
      this.ip = ENV.NORTHEAST_URL;
      this.web_ip = ENV.WEB_NORTHEAST_URL;
    }else if(this.lat<ENV.ENV_LAT && this.long > ENV.ENV_LONG){
      console.log("SOUTHEAST_URL");
      this.ip = ENV.SOUTHEAST_URL;
      this.web_ip = ENV.WEB_SOUTHEAST_URL;
    }

  }
}