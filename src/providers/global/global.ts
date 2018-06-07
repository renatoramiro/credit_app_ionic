import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {

  host: string = '10.100.100.9:';
  baseUrl: string = "http://" + this.host;
  socket: string = "ws://" + this.host;
  port: string = "4000";
  refUrl: string = "/api";
  versionApi: string = "application/vnd.credit-app.v1+json";
  contentType: string = 'application/json'

  constructor() {
    console.log('Hello GlobalProvider Provider');
  }

}
