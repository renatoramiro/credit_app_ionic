import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClientProvider } from '../../providers/client/client';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { TransactionsPage } from '../transactions/transactions';
import { Events } from 'ionic-angular';

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
      public clientProvider: ClientProvider, public events: Events) {
    this.client = navParams.data;
    this.events.publish('load-client', this.client);
  }

  ionViewWillEnter() {
    if (!this.client.id) {
      this.clientProvider.getClientByToken().subscribe(data => {
        this.client = data.body['data'];
        this.events.publish('load-client', this.client);
      }, error => {
        console.error('Error');
      });
    }
  }

  openPage(page) {
    this.navCtrl.push(page, this.client);
  }

}
