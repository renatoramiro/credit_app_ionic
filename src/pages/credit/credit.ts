import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, Events } from 'ionic-angular';
import { TransactionProvider } from '../../providers/transaction/transaction';
import { SendCreditComponent } from '../../components/send-credit/send-credit';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public transactionProvider: TransactionProvider, public loadingCtrl: LoadingController,
    public modalCtrl: ModalController, public events: Events) {
    this.client = navParams.data;
    this.input = {agency: '', account: '', value: ''};
    events.subscribe('credits-sended', data => {
      navCtrl.pop();
      events.publish('load-after-send-credit', true);
    });
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
        let transaction = {destiny: response, origin: this.client, value: this.input.value};
        this.modalCtrl.create(SendCreditComponent, transaction).present();
      }, error => {
        loading.dismiss();
      });
    }
  }

}