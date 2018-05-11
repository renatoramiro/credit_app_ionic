import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ClientProvider } from '../../providers/client/client';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { TransactionsPage } from '../transactions/transactions';
import { Events } from 'ionic-angular';
import { CreditPage } from '../credit/credit';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  public client: any;
  public editPage:any = EditProfilePage;
  public transactionsPage:any = TransactionsPage;
  public creditPage:any = CreditPage;
  loading = this.loadingCtrl.create({content: 'Carregando dados..'});

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public clientProvider: ClientProvider, public events: Events,
      public loadingCtrl: LoadingController) {
    this.client = navParams.data;
    this.events.publish('load-client', this.client);
  }

  ionViewDidEnter() {
    if (!this.client.id) {
      this.loadClient();
    }
  }

  openPage(page) {
    this.navCtrl.push(page, {client: this.client, callback: this.popCallback});
  }

  popCallback(params) {
    return new Promise((resolve, reject) => {
      this.client = params.client;
      resolve();
    });
  }

  loadClient() { 
    this.loading.present();
    this.clientProvider.getClientByToken().subscribe(data => {
      this.loading.dismiss();
      this.client = data.body['data'];
      this.events.publish('load-client', this.client);
    }, error => {
      this.loading.dismiss();
    });
  }

}
