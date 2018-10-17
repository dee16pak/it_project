import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartdataproviderProvider } from '../../providers/cartdataprovider/cartdataprovider';
import { AlertController } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration,  PayPalPaymentDetails} from '@ionic-native/paypal';


@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  orderList: any[] = [];
  total: any;
  constructor(private payPal: PayPal, public navCtrl: NavController, public navParams: NavParams,private cart: CartdataproviderProvider,private alertCtrl: AlertController) {
     this.orderList = [
     ];
    this.total = 0.0;
  }

  checkout(){
    this.payPal.init({
        PayPalEnvironmentProduction: '',
        PayPalEnvironmentSandbox: 'AZ2vWTozIVbMe1X6I_5buKMzNXlY4coHegGEUP4bGfNXXhTG2KC-QZkzZxjq7mwjB3gGjLs-CvufSqeF'
    }).then(() => {
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        acceptCreditCards: true,
        languageOrLocale: 'en-GB',
        merchantName: '',
        merchantPrivacyPolicyURL: '',
        merchantUserAgreementURL: ''
      })).then(() => {
        let detail = new PayPalPaymentDetails('19.99', '0.00', '0.00');
        let payment = new PayPalPayment('19.99', 'USD', 'name of restro', 'Sale', detail);
        this.payPal.renderSinglePaymentUI(payment).then((response) => {
          console.log('pagamento efetuado')
        }, () => {
          console.log('erro ao renderizar o pagamento do paypal');
        })
      })
    })
  }


  totalcal() {
    this.total = 0.0;
    for (let i = 0; i < this.orderList.length; i++) {
      this.total = (this.orderList[i].price * this.orderList[i].quantity) + this.total;
    }
  }
  sub(order) {
    console.log(order.name);
    console.log(order.itemname,order.name);
    for (let i = 0; i < this.orderList.length; i++) {
      if (this.orderList[i].itemid == order.itemid) {
      if(this.orderList[i].quantity-1>0){

        for(let j = 0;j<this.cart.groups[this.orderList[i].name].items.length;j++){
          if(this.cart.groups[this.orderList[i].name].items[j].itemid==order.itemid){
            this.cart.groups[this.orderList[i].name].items[j].quantity -= 1 
          }
        }
       // this.orderList[i].quantity = this.orderList[i].quantity - 1;
        this.orderListCal();
        
        this.totalcal();
      }
      else{
      this.presentConfirm(order,i )
      }
    }
    

    }
    console.log(order.quantity);

  }
  presentConfirm(order,i  ) {
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
            for(let j = 0;j<this.cart.groups[this.orderList[i].name].items.length;j++){
              if(this.cart.groups[this.orderList[i].name].items[j].itemid==order.itemid){
                this.cart.groups[this.orderList[i].name].items[j].quantity -= 1 
              }
            }
            //this.orderList[i].quantity = this.orderList[i].quantity - 1;
            //delete this.orderList[i];
            this.orderListCal();
            this.totalcal();  
            
          }
        }
      ]
    });
    alert.present();
  }
  
  add(order) {
    console.log(order.itemname,order.name);
    for (let i = 0; i < this.orderList.length; i++) {
      if (this.orderList[i].itemid == order.itemid) {
       
        for(let j = 0;j<this.cart.groups[this.orderList[i].name].items.length;j++){
          if(this.cart.groups[this.orderList[i].name].items[j].itemid==order.itemid){
            this.cart.groups[this.orderList[i].name].items[j].quantity += 1 
          }
          
        }
        this.orderListCal();
         //call add fuction;
        //this.orderList[i].quantity = this.orderList[i].quantity + 1;
        this.totalcal();
      }

    }
    console.log(order.quantity);

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');

    console.log(this.cart.groups.length);
    this.orderListCal();

   for (let i = 0; i < this.orderList.length; i++) {
      this.total = (this.orderList[i].price * this.orderList[i].quantity) + this.total;
    }
  }

  finish(fin_amt) {
    console.log(fin_amt);
  }
  orderListCal(){
    this.orderList=[]
  for (let i = 0;i<this.cart.groups.length;i++){
    // console.log(this.cart.groups[i].items.length);
     for(let j = 0;j<this.cart.groups[i].items.length;j++){
      // console.log(i,j);
       if(this.cart.groups[i].items[j].quantity>0){
       var temp  = this.cart.groups[i].items[j]
       temp.name = this.cart.groups[i].name

       this.orderList.push(this.cart.groups[i].items[j])
      // console.log(this.cart.groups[i].items[j].price)
     }
     }}
   }
  
}
