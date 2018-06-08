import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events, ToastController } from 'ionic-angular';
import { TransactionProvider } from '../../providers/transaction/transaction';
import { SocketProvider } from '../../providers/socket/socket';

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
      public events: Events, private toastCtrl: ToastController, private socket: SocketProvider) {
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
      this.socket.getCurrentChannel().push("transaction:msg", {body: {id: this.destiny.id, value: this.value}});
      this.callback({client: this.origin}).then(()=>{
        this.navCtrl.popToRoot();
     });
     this.toastCtrl.create({
      message: 'Transação realizada com sucesso.',
      duration: 3000
    }).present();
    }, error => {
      loading.dismiss();
      this.navCtrl.pop();
    });
  }

}
