import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { TransactionProvider } from '../../providers/transaction/transaction';

/**
 * Generated class for the SendCreditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-send-credit',
  templateUrl: 'send-credit.html',
})
export class SendCreditPage {

  public origin:any;
  public destiny:any;
  public value:any;
  callback: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public transactionProvider: TransactionProvider, public loadingCtrl: LoadingController,
      public events: Events) {
    this.origin = navParams.data.origin;
    this.destiny = navParams.data.destiny;
    this.value = parseFloat(navParams.data['value']).toFixed(2);
    this.callback = navParams.data.callback;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendCreditPage');
  }

  sendCredit() {
    let params = {
      transaction: {
        value: this.value,
        client_id: this.destiny.id,
        transaction_id: this.origin.id 
      }
    };
    const loading = this.loadingCtrl.create({content: 'Enviando dados...'});
    loading.present();
    this.transactionProvider.sendCredits(params).subscribe(data => {
      loading.dismiss();
      this.origin.credit -= this.value;
      this.callback({client: this.origin}).then(()=>{
        this.navCtrl.popToRoot();
     });
    }, error => {
      loading.dismiss();
      this.navCtrl.pop();
    });
  }

}
