import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, App, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TransactionsPage } from '../pages/transactions/transactions';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') nav: NavController;
  rootPage:any = HomePage;
  transactionsPage:any = TransactionsPage;
  editProfilePage:any = EditProfilePage;
  public client:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, app: App, public events: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.events.subscribe('load-client', (client) => {
      this.client = client;
    });

    this.events.subscribe('client-updated', (client) => {
      this.client = client;
    });

    this.events.subscribe('not-authorized', (option) => {
      if (this.nav.getActive().component.name !== 'HomePage') {
        this.logout();
      }
    })
  }

  openPage(page) {
    this.nav.push(page);
  }

  logout() {
    sessionStorage.removeItem('auth');
    sessionStorage.removeItem('data');
    this.nav.setRoot(HomePage);
  }
}

