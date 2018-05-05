import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SessionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SessionProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SessionProvider Provider');
  }

  login(credentials) {
    let headers = new HttpHeaders({'Content-Type':  'application/json'});
    return this.http.post('https://creditapp.ml/api/signin', JSON.stringify(credentials), {
      headers: headers, observe: 'response'});
  }

}
