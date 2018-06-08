import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Events } from 'ionic-angular';
import { ClientProvider } from '../../providers/client/client';
import { SocketProvider } from '../../providers/socket/socket';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  public client:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public clientProvider: ClientProvider, public loadingCtrl: LoadingController,
      public toastCtrl: ToastController, public events: Events, private socket: SocketProvider) {
  }

  ionViewWillEnter() {
    const loading = this.loadingCtrl.create({content: 'Carregando dados..'});
    loading.present();
    this.clientProvider.getClientByToken().subscribe((data) => {
      this.client = data.body['data'];
      this.socket.getCurrentChannel().push("reload_client:msg", {body: {id: this.client.id}});
      loading.dismiss();
    }, (error) => {
      loading.dismiss();
    });
  }

  update() {
    const loading = this.loadingCtrl.create({content: 'Enviando dados..'});
    loading.present();
    if (this.client.name !== '' && this.client.address !== '') {
      let params = {
        client: {
          id: this.client.id,
          name: this.client.name,
          address: this.client.address
        }
      };
      this.clientProvider.updateClient(params).subscribe(data => {
        loading.dismiss();
        this.events.publish('client-updated', data.body['data']);
        this.navCtrl.pop();
        this.toastCtrl.create({
          message: 'Atualizado com sucesso.',
          duration: 3000
        }).present();
      }, error => {
        loading.dismiss();
      });
    }
  }

}
