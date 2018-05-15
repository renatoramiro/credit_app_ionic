import { Component } from '@angular/core';
import { NavParams, ViewController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { SessionProvider } from '../../providers/session/session';
import { CreateClientComponent } from '../create-client/create-client';

/**
 * Generated class for the ActivateUserComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'activate-user',
  templateUrl: 'activate-user.html'
})
export class ActivateUserComponent {

  user: any;
  pin: string;

  constructor(public navParams: NavParams, public sessionProvider: SessionProvider,
      public viewCtrl: ViewController, public modalCtrl: ModalController,
      public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.user = this.navParams.get('response');
  }

  activateUser() {
    const params = { id: this.user.id, activation_code: this.pin }
    const loading = this.loadingCtrl.create({content: 'Ativando usuário...'});
    loading.present();
    this.sessionProvider.activate_user(params).subscribe(data => {
      loading.dismiss();
      this.viewCtrl.dismiss();
      let response = data.body['data'];
      localStorage.setItem("data", response.id);
      localStorage.setItem("auth", data.headers.get('Authorization'));
      this.modalCtrl.create(CreateClientComponent, {response: response}).present();
    }, error => {
      loading.dismiss();
      this.alertCtrl.create({
        title: 'PIN Errado',
        subTitle: 'Você digitou o PIN errado, tente novamente!',
        buttons: ['OK']
      }).present();
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
