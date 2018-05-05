import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import 'rxjs/Rx';
import { SessionProvider } from '../../providers/session/session';
import { MainPage } from '../main/main';
import { RegistrationComponent } from '../../components/registration/registration';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public input: any;

  constructor(public navCtrl: NavController, public sessionProvider: SessionProvider,
    public loadingCtrl: LoadingController, public modalCtrl: ModalController) {
    this.input = {document: '', password: ''};
  }

  ionViewDidLoad(){
    const auth = sessionStorage.getItem('auth');
    if (auth) {
      this.navCtrl.setRoot(MainPage);
    }
  }

  login(): void {
    const loading = this.loadingCtrl.create({content: 'Fazendo login...'});
    loading.present();
    let params = {"session": {"identity_document": this.input.document, "password": this.input.password}};
    if (this.input.document !== '' && this.input.password !== '') {
      this.sessionProvider.login(params).subscribe(data => {
        loading.dismiss();
        let response = data.body['data'];

        sessionStorage.setItem("data", response.id);
        sessionStorage.setItem("auth", data.headers.get('Authorization'));
        let params = {
          id: response.id,
          "user_id": response.user_id,
          "phone": response.phone,
          "name": response.name,
          "identity_document": response.identity_document,
          "credit": response.credit,
          "agency": response.agency,
          "account": response.account,
          "address": response.address,
        };
        this.navCtrl.setRoot(MainPage, params);
      }, error => {
        loading.dismiss();
        console.log(error.error.message);
      });
    } else {
      console.log('You need fill all fields.');
    }
  }

  register() {
    this.modalCtrl.create(RegistrationComponent).present();
  }
}
