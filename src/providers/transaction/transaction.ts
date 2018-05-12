import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TransactionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TransactionProvider {

  constructor(public http: HttpClient) {
    console.log('Hello TransactionProvider Provider');
  }

  getTransactions() {
    let headers = new HttpHeaders({'Content-Type':  'application/json'});
    return this.http.get("https://creditapp.ml/api/listcredits/",
      {headers: headers, observe: 'response'});
  }

  getClientTransaction(params) {
    let headers = new HttpHeaders({'Content-Type':  'application/json'});
    return this.http.post("https://creditapp.ml/api/getclient/", JSON.stringify(params),
      {headers: headers, observe: 'response'});
  }

  sendCredits(params) {
    let headers = new HttpHeaders({'Content-Type':  'application/json'});
    return this.http.post("https://creditapp.ml/api/sendcredit/", JSON.stringify(params),
      {headers: headers, observe: 'response'});
  }

}
