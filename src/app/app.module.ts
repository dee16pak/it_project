import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CheckoutPage } from '../pages/checkout/checkout';
import { CartdataproviderProvider } from '../providers/cartdataprovider/cartdataprovider';
import { VenuelistPage } from '../pages/venuelist/venuelist';

import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocationProvider } from '../providers/location/location';

import { MenuPage } from '../pages/menu/menu';
import {MenuModalPage} from '../pages/menu-modal/menu-modal'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MenuPage,
    MenuModalPage,
    CheckoutPage,
    VenuelistPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MenuPage,
    MenuModalPage,
    CheckoutPage,
    VenuelistPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CartdataproviderProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    Geolocation,
    LocationProvider
  ]
})
export class AppModule {}
