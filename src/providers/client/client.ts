import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalProvider } from '../global/global';

/*
  Generated class for the ClientProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClientProvider {

  constructor(public http: HttpClient, private global: GlobalProvider) {
    console.log('Hello ClientProvider Provider');
  }

  getClientByToken() {
    return this.http.get(this.global.baseUrl + this.global.port + this.global.refUrl + "/getclientbytoken/",
      {observe: 'response'});
  }

  createClient(params) {
    return this.http.post(this.global.baseUrl + this.global.port + this.global.refUrl + "/clients/", JSON.stringify(params),
      {observe: 'response'});
  }

  updateClient(params) {
    return this.http.put(this.global.baseUrl + this.global.port + this.global.refUrl + "/clients/" + params.client.id,
      JSON.stringify(params), {observe: 'response'});
  }

  getClientById(id) {
    return this.http.get(this.global.baseUrl + this.global.port + this.global.refUrl + "/clients/" + id,
      {observe: 'response'});
  }

}
