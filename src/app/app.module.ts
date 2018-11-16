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
import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { LocationProvider } from '../providers/location/location';
import { PayPal } from '@ionic-native/paypal';
import { MenuPage } from '../pages/menu/menu';
import {MenuModalPage} from '../pages/menu-modal/menu-modal'
import {OrderModalPage} from '../pages/order-modal/order-modal'

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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
    VenuelistPage,
    OrderPage,
    OrderModalPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CartdataproviderProvider,
    Geolocation,
    LocationProvider,
    PayPal,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
   
  ]
})
export class AppModule {}
