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
    return this.http.post('http://10.100.100.9:4000/api/signin', JSON.stringify(credentials), {
      headers: headers, observe: 'response'});
  }

  register(params) {
    let headers = new HttpHeaders({'Content-Type':  'application/json'});
    return this.http.post('http://10.100.100.9:4000/api/signup', JSON.stringify(params), {
      headers: headers, observe: 'response'});
  }

  activate_user(params) {
    let headers = new HttpHeaders({'Content-Type':  'application/json'});
    return this.http.post('http://10.100.100.9:4000/api/activateuser', JSON.stringify(params), {
      headers: headers, observe: 'response'});
  }

}
