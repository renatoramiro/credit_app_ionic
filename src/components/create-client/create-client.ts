import { Component } from '@angular/core';
import { NavParams, ViewController, NavController, LoadingController, AlertController } from 'ionic-angular';
import { ClientProvider } from '../../providers/client/client';

/**
 * Generated class for the CreateClientComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'create-client',
  templateUrl: 'create-client.html'
})
export class CreateClientComponent {

  client: any;
  user:any;

  constructor(public navParams: NavParams, public clientProvider: ClientProvider,
      public viewCtrl: ViewController, public navCtrl: NavController,
      public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    this.user = this.navParams.get('response');
    this.client = { name: '', address: '', user_id: this.user.id};
  }

  create() {
    if (this.client.name !== '' && this.client.address !== '' && this.client.user_id) {
      const params = {client: this.client };
      const loading = this.loadingCtrl.create({content: 'Enviando dados...'});
      loading.present();
      this.clientProvider.createClient(params).subscribe(data => {
        loading.dismiss();
        this.viewCtrl.dismiss();
        localStorage.removeItem("data");
        localStorage.removeItem("auth");
        
        this.alertCtrl.create({
          title: 'Sucesso',
          subTitle: 'Sua conta foi criada com sucesso!!',
          buttons: ['OK']
        }).present();
      }, error => {
        loading.dismiss();
      });
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
