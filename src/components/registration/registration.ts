import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController, ViewController } from 'ionic-angular';
import { SessionProvider } from '../../providers/session/session';
import { ActivateUserComponent } from '../activate-user/activate-user';

/**
 * Generated class for the RegistrationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'registration',
  templateUrl: 'registration.html'
})
export class RegistrationComponent {

  public user:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public loadingCtrl: LoadingController, public sessionProvider: SessionProvider,
      public modalCtrl: ModalController, public viewCtrl: ViewController) {
    this.user = {identity_document: '', phone: '', password: '', enabled: false};
  }

  register() {
    if (this.user.identity_document !== '' && this.user.phone !== '', this.user.password !== '') {
      const loading = this.loadingCtrl.create({content: 'Criando conta...'});
      loading.present();
      const params = {
        user: this.user
      };
      this.sessionProvider.register(params).subscribe(data => {
        this.viewCtrl.dismiss();
        loading.dismiss();
        const response = data.body['data'];
        this.modalCtrl.create(ActivateUserComponent, {response: response}).present();
      }, error => {
        loading.dismiss();
      });
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
