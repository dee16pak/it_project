import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PayPal } from '@ionic-native/paypal';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ENV } from '../../env';
import { CartdataproviderProvider } from '../../providers/cartdataprovider/cartdataprovider';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { OrderPage } from '../order/order';
@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  cartList: any[] = [];
  total: any;
  order: { user: string; status : Number, venueid: string;venue_name: string; orderitem: { item_name: string; item_sub_name: string; price: number; qty: number; }[]; transationid: string; bill: number; };
  orderFlag: boolean;

  constructor(public user : UserDataProvider, public http: HttpClient, private payPal: PayPal, public navCtrl: NavController, public navParams: NavParams, private cartProvider: CartdataproviderProvider, private alertCtrl: AlertController) {
    this.cartList = [
    ];
    this.total = 0.0;
  }

  checkout() {
    //   this.payPal.init({
    //       PayPalEnvironmentProduction: '',
    //       PayPalEnvironmentSandbox: 'AZ2vWTozIVbMe1X6I_5buKMzNXlY4coHegGEUP4bGfNXXhTG2KC-QZkzZxjq7mwjB3gGjLs-CvufSqeF'
    //   }).then(() => {
    //     this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
    //       acceptCreditCards: true,
    //       languageOrLocale: 'en-GB',
    //       merchantName: '',
    //       merchantPrivacyPolicyURL: '',
    //       merchantUserAgreementURL: ''
    //     })).then(() => {
    //       let detail = new PayPalPaymentDetails('19.99', '0.00', '0.00');
    //       let payment = new PayPalPayment('19.99', 'USD', 'name of restro', 'Sale', detail);
    //       this.payPal.renderSinglePaymentUI(payment).then((response) => {
    //         console.log('pagamento efetuado')
    //       }, () => {
    //         console.log('erro ao renderizar o pagamento do paypal');
    //       })
    //     })
    //   })
    this.placeorder();
  }
  private makeUrl(uri, session, addQueryString = true) {
    let url = `${ENV.BACKEND_URL}${uri}`;
    if (addQueryString) {
      url += `?email=${session.email}&sid=${session.sid}`;
    }
    return url;
  }

  placeorder() {
    if(this.orderFlag){
      if(this.total>0){
   // console.log(this.cartList.it);
    this.order =     
    { 
      user: this.user.getUserId(),
      venueid: this.user.curSelectedVenue._id,
      venue_name : this.user.curSelectedVenue.name,
      orderitem:this.cartList,
      transationid: "TODO",
      status: 0,
      bill: this.total
    }

    this.orderdb(this.order)
      .then(() => {
        this.showAlert('Order Placed','Your order has been placed succuessfully. Going to orders page to check status');
        for(let cart of this.cartList ){
          this.cartProvider.groups[cart.group_id].itemlist[cart.item_id].qty = 0
        }
        this.cartList = [];
        this.total=0;
        this.orderFlag = false;
    
      })
      .catch(err => {
        this.showAlert('Error','Error while placing your order try again.');
        console.log(err);
      });
    }
    }
  }
  showAlert(title,subTitle) {
    const alert = this.alertCtrl.create({
      title: title ,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present().then(()=>{this.navCtrl.push(OrderPage);} )

  }

  // private makeToast(message) {
  //   this.toastCtrl.create({
  //     message,
  //     duration: 3000,
  //     position: 'bottom'
  //   }).present();
  // }
  orderdb(orders) {
    console.log(orders);
    return this.http.post(this.makeUrl('/order/orderRegisteration', null, false), { order: orders }, {}).toPromise();

  }

  totalcal() {
    this.total = 0.0;
    for (let i = 0; i < this.cartList.length; i++) {
      this.total = (this.cartList[i].price * this.cartList[i].qty) + this.total;
    }
  }
  sub(cart) {
  //  console.log(cart.name);
   // console.log(cart.itemname, cart.name);
    if (this.cartProvider.groups[cart.group_id].itemlist[cart.item_id].qty - 1 > 0) {
      this.cartProvider.groups[cart.group_id].itemlist[cart.item_id].qty = this.cartProvider.groups[cart.group_id].itemlist[cart.item_id].qty - 1;

    }
    else {
      this.presentConfirm(cart)
    }

    // console.log(cart.quantity);

  }
  presentConfirm(cart) {
    let alert = this.alertCtrl.create({
      title: 'Remove item from cart',
      message: 'Do you want to remove item from cart?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('yes clicked');
            this.cartProvider.groups[cart.group_id].itemlist[cart.item_id].qty = 0;
            //this.cartList[i].quantity = this.cartList[i].quantity - 1;
            //delete this.cartList[i];
            this.cartListCal();
            this.totalcal();

          }
        }
      ]
    });
    alert.present();
  }

  add(cart) {
    //console.log(cart.group_id, cart.item_id);
    this.cartProvider.groups[cart.group_id].itemlist[cart.item_id].qty = this.cartProvider.groups[cart.group_id].itemlist[cart.item_id].qty + 1;
    this.cartListCal();
    this.totalcal();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  //  console.log(this.cartProvider.groups.length);
    this.cartListCal();
    if (this.cartList != null) {
      for (let i = 0; i < this.cartList.length; i++) {
        this.total = (this.cartList[i].price * this.cartList[i].qty) + this.total;
      }
    }
  }

  finish(fin_amt) {
    console.log(fin_amt);
  }
  cartListCal() {
    this.cartList = []
    if (this.cartProvider.groups != null) {
      for (let i = 0; i < this.cartProvider.groups.length; i++) {
        // console.log(this.cart.groups[i].items.length);
        if (this.cartProvider.groups[i].itemlist != null) {
          for (let j = 0; j < this.cartProvider.groups[i].itemlist.length; j++) {
            // console.log(i,j);
            if (this.cartProvider.groups[i].itemlist[j].qty > 0) {
              var temp = this.cartProvider.groups[i].itemlist[j]
              temp.group_name = this.cartProvider.groups[i].group_name
              temp.group_id = i;
              temp.item_id = j;
              this.cartList.push(this.cartProvider.groups[i].itemlist[j])
              this.orderFlag= true;
              // console.log(this.cart.groups[i].items[j].price)
            }
          }
        }
      }
    }
  }
  gotoOrder(){
    this.navCtrl.push(OrderPage);
  }

}
