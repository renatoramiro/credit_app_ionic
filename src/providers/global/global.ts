import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {

  host: string = 'creditapp.ml';
  baseUrl: string = "https://" + this.host;
  socket: string = "wss://" + this.host;
  port: string = "";
  refUrl: string = "/api";
  versionApi: string = "application/vnd.credit-app.v1+json";
  contentType: string = 'application/json'

  constructor() {
    console.log('Hello GlobalProvider Provider');
  }

}