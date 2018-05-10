import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendCreditPage } from './send-credit';

@NgModule({
  declarations: [
    SendCreditPage,
  ],
  imports: [
    IonicPageModule.forChild(SendCreditPage),
  ],
})
export class SendCreditPageModule {}
