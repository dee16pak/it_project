import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ENV } from '../../env';

/*
  Generated class for the UserDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserDataProvider {
  //private user: any = undefined;
  private session: any = undefined;
  private isLoggedIn: boolean = false;
  public curSelectedVenue = null;

  private static SESSION_BASE: string = 'session';
  constructor(public http: HttpClient, public storage: Storage, public toast: ToastController) { }

  makeUrl(uri, session, addQueryString=true, useCurrentSession=false) {
    let url =  `${ENV.BACKEND_URL}${uri}`;
    if(addQueryString) {
      if(useCurrentSession) session = this.session;
      url += `?email=${session.email}&sid=${session.sid}`;
    }
    return url;
  }

  private updateSessionLocally(session) {
    this.storage.set(UserDataProvider.SESSION_BASE, session);
    this.isLoggedIn = true;
    this.session = session;
  }

  getUserId() {
    return this.session.email;
  }

  isUserLoggedIn() {
    return this.isLoggedIn;
  }

  async login(email, password) {
    const res = await this.http.post(this.makeUrl('/user/login', null, false), { email, password }, {}).toPromise();
    this.updateSessionLocally(res);
  }

  signup(user) {
    return this.http.post(this.makeUrl('/user/registrationRequest', null, false), { ...user }, {}).toPromise();
  }

  async checkLogin() {//get prev session from local storage and validate from server
    const prevSession = await this.storage.get(UserDataProvider.SESSION_BASE);
    if(prevSession.sid) {
      await this.http.get(this.makeUrl('/user/validateSession', prevSession)).toPromise();
      this.updateSessionLocally(prevSession);
    } else {
      throw new Error('Not LoggedIn');
    }
  }

  hasAuthFailed(httpResponseError) {
    if(httpResponseError.error && httpResponseError.error['auth_failed']) {
      this.toast.create({
        message: 'You\'ve been logged out.',
        duration: 3000,
        position: 'bottom'
      }).present();
      return true;
    }
    return false;
  }

  async logout() {
    await this.http.get(this.makeUrl('/user/logout', this.session)).toPromise();

    this.storage.remove(UserDataProvider.SESSION_BASE);
    this.isLoggedIn = false;
    this.session = undefined;
  }

  getProfile() {
    return this.http.get(this.makeUrl('/user/basicProfile', this.session)).toPromise();
  }

  updateProfile(updatedProfile) {
    return this.http.post(this.makeUrl('/user/basicProfile', this.session), updatedProfile).toPromise();
  }
}
