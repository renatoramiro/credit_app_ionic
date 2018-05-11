import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, Events } from 'ionic-angular';
import { TransactionProvider } from '../../providers/transaction/transaction';
import { SendCreditPage } from '../send-credit/send-credit';

/**
 * Generated class for the CreditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-credit',
  templateUrl: 'credit.html',
})
export class CreditPage {
  input:any;
  client:any;
  callback:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public transactionProvider: TransactionProvider, public loadingCtrl: LoadingController,
    public modalCtrl: ModalController, public events: Events) {
    this.client = navParams.data.client;
    this.callback = navParams.data.callback;
    this.input = {agency: '', account: '', value: ''};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreditPage');
  }

  confirmDestiny() {
    const loading = this.loadingCtrl.create({content: 'Buscando dados..'});
    if (this.input.agency !== '' && this.input.account !== '' && this.input.value !== '') {
      loading.present();
      let params = {account: this.input.account, agency: this.input.agency};
      this.transactionProvider.getClientTransaction(params).subscribe(data => {
        loading.dismiss();
        let response = data.body['data'];
        let transaction = {destiny: response, origin: this.client, value: this.input.value, callback: this.callback};
        this.navCtrl.push(SendCreditPage, transaction);
      }, error => {
        loading.dismiss();
      });
    }
  }

}
