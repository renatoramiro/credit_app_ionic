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
    return this.http.get("http://192.168.0.102:4000/api/listcredits/",
      {headers: headers, observe: 'response'});
  }

}
