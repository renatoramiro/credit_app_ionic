import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { TransactionProvider } from '../../providers/transaction/transaction';
import { ClientProvider } from '../../providers/client/client';
import { TransferInfoComponent } from '../../components/transfer-info/transfer-info';

/**
 * Generated class for the TransactionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage {

  public transactions:any;
  public currentUser:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public transactionProvider: TransactionProvider, public loadingCtrl: LoadingController,
      private clientProvider: ClientProvider, private modalCtrl: ModalController) {
    this.transactions = [];
  }

  ionViewWillEnter() {
    const loading = this.loadingCtrl.create({content: 'Buscando dados...'});
    loading.present();
    this.transactionProvider.getTransactions().subscribe(data => {
      loading.dismiss();
      this.transactions = data.body['data'];
      this.currentUser = data.body['current_user'];
    }, error => {
      loading.dismiss();
    });
  }

  showInfo(clientId) {
    const loading = this.loadingCtrl.create({content: 'Buscando dados...'});
    loading.present();
    this.clientProvider.getClientById(clientId).subscribe(data => {
      loading.dismiss();
      this.modalCtrl.create(TransferInfoComponent, {response: data.body['data']}).present();
    }, err => {
      loading.dismiss();
    });
  }

}
