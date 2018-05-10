import { Component } from '@angular/core';
import { NavParams, LoadingController, ViewController, Events } from 'ionic-angular';
import { TransactionProvider } from '../../providers/transaction/transaction';

/**
 * Generated class for the SendCreditComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'send-credit',
  templateUrl: 'send-credit.html'
})
export class SendCreditComponent {

  public origin:any;
  public destiny:any;
  public value:any;

  constructor(public navParams: NavParams, public transactionProvider: TransactionProvider,
      public loadingCtrl: LoadingController, public viewCtrl: ViewController,
      public events: Events) {
    this.origin = navParams.data.origin;
    this.destiny = navParams.data.destiny;
    this.value = parseFloat(navParams.data['value']).toFixed(2);
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
      this.viewCtrl.dismiss();
      this.events.publish('credits-sended', true);
      loading.dismiss();
    }, error => {
      loading.dismiss();
      this.viewCtrl.dismiss();
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
