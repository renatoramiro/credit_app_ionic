import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TransactionProvider } from '../../providers/transaction/transaction';
import { HomePage } from '../home/home';

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
      public transactionProvider: TransactionProvider, public loadingCtrl: LoadingController) {
    this.transactions = [];
  }

  ionViewWillEnter() {
    let auth = sessionStorage.getItem('auth');
    const loading = this.loadingCtrl.create({content: 'Buscando dados...'});
    if (auth) {
      loading.present();
      this.transactionProvider.getTransactions(auth).subscribe(data => {
        loading.dismiss();
        this.transactions = data.body['data'];
        this.currentUser = data.body['current_user'];
      }, error => {
        loading.dismiss();
        console.error('Error');
      });
    } else {
      this.navCtrl.setRoot(HomePage);
    }
  }

}
