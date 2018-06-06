import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController, ToastController } from 'ionic-angular';
import 'rxjs/Rx';
import { SessionProvider } from '../../providers/session/session';
import { MainPage } from '../main/main';
import { RegistrationComponent } from '../../components/registration/registration';
import { ActivateUserComponent } from '../../components/activate-user/activate-user';
import { CreateClientComponent } from '../../components/create-client/create-client';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public input: any;

  constructor(public navCtrl: NavController, public sessionProvider: SessionProvider,
    public loadingCtrl: LoadingController, public modalCtrl: ModalController,
    public toastCtrl: ToastController) {
      this.setupInput();
      this.setRootPage();
  }

  setRootPage(){
    let auth = localStorage.getItem('auth');
    if (auth) {
      this.navCtrl.setRoot(MainPage);
    }
  }

  login(): void {
    const loading = this.loadingCtrl.create({content: 'Fazendo login...'});
    let params = {"session": {"identity_document": this.input.document, "password": this.input.password}};
    
    if (this.input.document !== '' && this.input.password !== '') {
      loading.present();
      this.sessionProvider.login(params).subscribe(data => {
        loading.dismiss();
        let response = data.body['data'];

        localStorage.setItem("data", response.id);
        localStorage.setItem("data_user", response.user_id);
        
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
        this.setupInput();
        this.openModalAfterError(error);
      });
    } else {
      this.toastCtrl.create({message: 'Preencha todos os campos.', duration: 3000}).present();
    }
  }

  openModalAfterError(error) {
    if (error.status === 412 && error.error.condition === 'not_activated') {
      let response = {
        id: error.error.id
      };
      this.modalCtrl.create(ActivateUserComponent, {response: response}).present();
    }

    if (error.status === 412 && error.error.condition === 'client_not_created') {
      let response = {
        id: error.error.id
      };
      this.modalCtrl.create(CreateClientComponent, {response: response}).present();
    }
  }

  register() {
    this.modalCtrl.create(RegistrationComponent).present();
  }

  setupInput() {
    this.input = {document: '', password: ''};
  }
}
