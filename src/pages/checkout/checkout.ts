import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CartdataproviderProvider } from '../../providers/cartdataprovider/cartdataprovider';
import { AlertController } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration, PayPalPaymentDetails } from '@ionic-native/paypal';
import { HttpClient } from '@angular/common/http';
import { ENV } from '../../env';
@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  cartList: any[] = [];
  total: any;
  order: { user: string; venue: string; orderitem: { item_name: string; item_sub_name: string; price: number; qty: number; }[];transationid: string; bill: number; };
 
  constructor(public toastCtrl: ToastController,public http: HttpClient,private payPal: PayPal, public navCtrl: NavController, public navParams: NavParams, private cart: CartdataproviderProvider, private alertCtrl: AlertController) {
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
  private makeUrl(uri, session, addQueryString=true) {
    let url =  `${ENV.BACKEND_URL}${uri}`;
    if(addQueryString) {
      url += `?email=${session.email}&sid=${session.sid}`;
    }
    return url;
  }

  placeorder() {

     this.order = {
      user: "12345678",
      venue: "dhaba",
      orderitem: [{
        item_name: "haralaa lalsadasl",
        item_sub_name: "pane",
        price: 10,
        qty: 0,
      },{
        item_name: "haralaa lalsadasl",
        item_sub_name: "pane",
        price: 10,
        qty: 0,
      }],
      transationid: "fromsadDeepak",
      bill: this.total}

      this.orderdb(this.order)
      .then(() => {
        this.makeToast('placed successfully.');
      })
      .catch(err => {
        this.makeToast('Error Occured, while ordering up.');
        console.log(err);
});
      

  }
  private makeToast(message) {
    this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom'
    }).present();
}
  orderdb(orders){
    //  let headers = new Headers();
    // // headers.append("Accept", 'application/json');
    //  headers.append('Content-Type', 'application/json' );
    // // const requestOptions = new RequestOptions({ headers: headers });  
    console.log(orders);
   // let orderJson = {order : orders}
  //   this.http.post(this.makeUrl('/order/orderRegisteration', null, false), JSON.stringify({l:"ghhghggh"}) ,  {}).subscribe(data => {
  //    console.log(data)
  //  });
    return this.http.post(this.makeUrl('/order/orderRegisteration', null, false), {order : orders} ,  {}).toPromise();

  }

  totalcal() {
    this.total = 0.0;
    for (let i = 0; i < this.cartList.length; i++) {
      this.total = (this.cartList[i].price * this.cartList[i].quantity) + this.total;
    }
  }
  sub(cart) {
    console.log(cart.name);
    console.log(cart.itemname, cart.name);
    for (let i = 0; i < this.cartList.length; i++) {
      if (this.cartList[i].itemid == cart.itemid) {
        if (this.cartList[i].quantity - 1 > 0) {

          for (let j = 0; j < this.cart.groups[this.cartList[i].name].items.length; j++) {
            if (this.cart.groups[this.cartList[i].name].items[j].itemid == cart.itemid) {
              this.cart.groups[this.cartList[i].name].items[j].quantity -= 1
            }
          }
          // this.cartList[i].quantity = this.cartList[i].quantity - 1;
          this.cartListCal();

          this.totalcal();
        }
        else {
          this.presentConfirm(cart, i)
        }
      }


    }
    console.log(cart.quantity);

  }
  presentConfirm(cart, i) {
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
            for (let j = 0; j < this.cart.groups[this.cartList[i].name].items.length; j++) {
              if (this.cart.groups[this.cartList[i].name].items[j].itemid == cart.itemid) {
                this.cart.groups[this.cartList[i].name].items[j].quantity -= 1
              }
            }
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
    console.log(cart.itemname, cart.name);
    for (let i = 0; i < this.cartList.length; i++) {
      if (this.cartList[i].itemid == cart.itemid) {

        for (let j = 0; j < this.cart.groups[this.cartList[i].name].items.length; j++) {
          if (this.cart.groups[this.cartList[i].name].items[j].itemid == cart.itemid) {
            this.cart.groups[this.cartList[i].name].items[j].quantity += 1
          }

        }
        this.cartListCal();
        //call add fuction;
        //this.cartList[i].quantity = this.cartList[i].quantity + 1;
        this.totalcal();
      }

    }
    console.log(cart.quantity);

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');

    console.log(this.cart.groups.length);
    this.cartListCal();

    for (let i = 0; i < this.cartList.length; i++) {
      this.total = (this.cartList[i].price * this.cartList[i].quantity) + this.total;
    }
  }

  finish(fin_amt) {
    console.log(fin_amt);
  }
  cartListCal() {
    this.cartList = []
    for (let i = 0; i < this.cart.groups.length; i++) {
      // console.log(this.cart.groups[i].items.length);
      for (let j = 0; j < this.cart.groups[i].items.length; j++) {
        // console.log(i,j);
        if (this.cart.groups[i].items[j].quantity > 0) {
          var temp = this.cart.groups[i].items[j]
          temp.name = this.cart.groups[i].name

          this.cartList.push(this.cart.groups[i].items[j])
          // console.log(this.cart.groups[i].items[j].price)
        }
      }
    }
  }

}
