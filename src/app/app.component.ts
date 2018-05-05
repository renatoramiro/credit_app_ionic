import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TransactionsPage } from '../pages/transactions/transactions';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') nav: NavController;
  rootPage:any = MainPage;
  transactionsPage:any = TransactionsPage;
  editProfilePage:any = EditProfilePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, app: App) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    app.viewWillEnter.subscribe(
      (data) => {        
        let auth = sessionStorage.getItem('auth');
        if (data.component.name !== 'HomePage' && (auth === null || auth === undefined)) {
          this.nav.setRoot(HomePage);
        }
      }
    );
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
