import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  private static SESSION_BASE: string = 'session';
  constructor(public http: HttpClient, public storage: Storage) {
    console.log('Hello UserDataProvider Provider');
  }

  private makeUrl(uri, session, addQueryString=true) {
    let url =  `${ENV.BACKEND_URL}${uri}`;
    if(addQueryString) {
      url += `?email=${session.email}&sid=${session.sid}`;
    }
    return url;
  }

  private updateSessionLocally(session) {
    this.storage.set(UserDataProvider.SESSION_BASE, session);
    this.isLoggedIn = true;
    this.session = session;
  }

  isUserLoggedIn() {
    return this.isLoggedIn;
  }

  async login(email, password) {
    const res = await this.http.post(this.makeUrl('/user/login', null, false), { email, password }, {}).toPromise();
    this.updateSessionLocally(res);
  }

  signup(user) {
    return this.http.post(this.makeUrl('/user/registrationRequest', null, false), { user }, {}).toPromise();
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
