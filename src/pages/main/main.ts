import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClientProvider } from '../../providers/client/client';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { TransactionsPage } from '../transactions/transactions';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public clientProvider: ClientProvider) {
    this.client = navParams.data;
  }

  ionViewWillEnter() {
    if (!this.client.id) {
      this.clientProvider.getClientByToken().subscribe(data => {
        this.client = data.body['data'];
      }, error => {
        console.error('Error');
      });
    }
  }

  openPage(page) {
    this.navCtrl.push(page, this.client);
  }

}
