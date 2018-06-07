import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalProvider } from '../global/global';

/*
  Generated class for the SessionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SessionProvider {

  headers: any;

  constructor(public http: HttpClient, private global: GlobalProvider) {
    console.log('Hello SessionProvider Provider');
    this.headers = new HttpHeaders({'Content-Type':  this.global.contentType, "Accept": this.global.versionApi});
  }

  login(credentials) {
    return this.http.post(this.global.baseUrl + this.global.port + this.global.refUrl + '/signin', JSON.stringify(credentials), {
      headers: this.headers, observe: 'response'});
  }

  register(params) {
    return this.http.post(this.global.baseUrl + this.global.port + this.global.refUrl + '/signup', JSON.stringify(params), {
      headers: this.headers, observe: 'response'});
  }

  activate_user(params) {
    return this.http.post(this.global.baseUrl + this.global.port + this.global.refUrl + '/activateuser', JSON.stringify(params), {
      headers: this.headers, observe: 'response'});
  }

}
