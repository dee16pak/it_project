import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CheckoutPage } from '../pages/checkout/checkout';
import { CartdataproviderProvider } from '../providers/cartdataprovider/cartdataprovider';
import { VenuelistPage } from '../pages/venuelist/venuelist';
import { OrderPage} from '../pages/order/order';

import { LoginPage } from '../pages/login/login';

import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { LocationProvider } from '../providers/location/location';
import { PayPal } from '@ionic-native/paypal';
import { MenuPage } from '../pages/menu/menu';
import {MenuModalPage} from '../pages/menu-modal/menu-modal'
import {OrderModalPage} from '../pages/order-modal/order-modal'
import { UserDataProvider } from '../providers/user-data/user-data';

import { ENV } from '../env';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MenuPage,
    MenuModalPage,
    CheckoutPage,
    VenuelistPage,
    OrderPage,
    OrderModalPage,
    LoginPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: ENV.LOCAL_STORAGE_NAME
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MenuPage,
    MenuModalPage,
    CheckoutPage,
    VenuelistPage,
    OrderPage,
    OrderModalPage,
    LoginPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CartdataproviderProvider,
    Geolocation,
    LocationProvider,
    PayPal,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserDataProvider,
  ]
})
export class AppModule {}
