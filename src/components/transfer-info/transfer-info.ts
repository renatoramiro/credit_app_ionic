import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TransferInfoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'transfer-info',
  templateUrl: 'transfer-info.html'
})
export class TransferInfoComponent {

  client:any;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.client = navParams.data.response;
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
