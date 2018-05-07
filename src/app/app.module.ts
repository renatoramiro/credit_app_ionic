import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from "@angular/common/http";

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { TransactionsPage } from '../pages/transactions/transactions';

import { SessionProvider } from '../providers/session/session';
import { ClientProvider } from '../providers/client/client';
import { TransactionProvider } from '../providers/transaction/transaction';
import { ActivateUserComponent } from '../components/activate-user/activate-user';
import { CreateClientComponent } from '../components/create-client/create-client';
import { RegistrationComponent } from '../components/registration/registration';
import { InterceptorModule } from '../module/intercetor.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainPage,
    EditProfilePage,
    TransactionsPage,
    ActivateUserComponent,
    CreateClientComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    InterceptorModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MainPage,
    EditProfilePage,
    TransactionsPage,
    ActivateUserComponent,
    CreateClientComponent,
    RegistrationComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SessionProvider,
    ClientProvider,
    TransactionProvider
  ]
})
export class AppModule {}
