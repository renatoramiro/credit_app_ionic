import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ClientProvider } from '../../providers/client/client';

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
      public toastCtrl: ToastController) {
  }

  ionViewWillEnter() {
    const loading = this.loadingCtrl.create({content: 'Carregando dados..'});
    loading.present();
    this.clientProvider.getClientByToken().subscribe((data) => {
      this.client = data.body['data'];
      loading.dismiss();
    }, (error) => {
      console.log(error);
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
        this.navCtrl.pop();
        this.toastCtrl.create({
          message: 'Atualizado com sucesso.',
          duration: 3000
        }).present();
      }, error => {
        loading.dismiss();
        console.log(error);
      });
    }
  }

}
