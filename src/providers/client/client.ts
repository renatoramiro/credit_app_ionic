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

  getClientByToken() {
    let headers = new HttpHeaders({'Content-Type':  'application/json'});
    return this.http.get("http://localhost:4000/api/getclientbytoken/",
      {headers: headers, observe: 'response'});
  }

  createClient(params) {
    let headers = new HttpHeaders({'Content-Type':  'application/json'});
    return this.http.post("http://localhost:4000/api/clients/", JSON.stringify(params),
      {headers: headers, observe: 'response'});
  }

  updateClient(params) {
    let headers = new HttpHeaders({'Content-Type':  'application/json'});
    return this.http.put("http://localhost:4000/api/clients/" + params.client.id,
      JSON.stringify(params), {headers: headers, observe: 'response'});
  }

  getClientById(id) {
    let headers = new HttpHeaders({'Content-Type':  'application/json'});
    return this.http.get("http://localhost:4000/api/clients/" + id,
      {headers: headers, observe: 'response'});
  }

}
