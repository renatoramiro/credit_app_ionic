import { Injectable } from '@angular/core';
import { Socket } from 'phoenix-channels';
import { GlobalProvider } from '../global/global';

/*
  Generated class for the SocketProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SocketProvider {

  private socket
  private channel;

  constructor(private global: GlobalProvider) {
    console.log('Hello SocketProvider Provider');
  }

  connect(token) {
    this.socket = new Socket(this.global.socket + this.global.port + "/socket", {params: {token: token}});
    this.socket.connect();
  }

  getCurrentSocket() {
    return this.socket;
  }

  join(socket, user_id) {
    this.channel = socket.channel("room:" + user_id, {});
    this.channel.join()
          .receive("ok", resp => { console.log("Joined successfully", resp) })
          .receive("error", resp => { console.log("Unable to join", resp) });
  }

  getCurrentChannel() {
    return this.channel;
  }

}
