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

  getTransactions(auth) {
    let headers = new HttpHeaders({'Content-Type':  'application/json', 'Authorization': auth});
    return this.http.get("http://localhost:4000/api/listcredits/",
      {headers: headers, observe: 'response'});
  }

}
