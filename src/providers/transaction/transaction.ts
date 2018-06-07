import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalProvider } from '../global/global';

/*
  Generated class for the TransactionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TransactionProvider {

  constructor(public http: HttpClient, private global: GlobalProvider) {
    console.log('Hello TransactionProvider Provider');
  }

  getTransactions() {
    return this.http.get(this.global.baseUrl + this.global.port + this.global.refUrl + "/listcredits/",
      {observe: 'response'});
  }

  getClientTransaction(params) {
    return this.http.post(this.global.baseUrl + this.global.port + this.global.refUrl + "/getclient/", JSON.stringify(params),
      {observe: 'response'});
  }

  sendCredits(params) {
    return this.http.post(this.global.baseUrl + this.global.port + this.global.refUrl + "/sendcredit/", JSON.stringify(params),
      {observe: 'response'});
  }

}
