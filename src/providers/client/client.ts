import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ClientProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClientProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ClientProvider Provider');
  }

  getClientByToken(auth) {
    let headers = new HttpHeaders({'Content-Type':  'application/json', 'Authorization': auth});
    return this.http.get("https://creditapp.ml/api/getclientbytoken/",
      {headers: headers, observe: 'response'});
  }

}
