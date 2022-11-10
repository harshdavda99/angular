import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';  
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor(private socket: Socket) { }

  fetchMessages() {
		this.socket.emit('fetchmessage');
	} 

  onFetchMessages() {
		return this.socket.fromEvent('fetchmessage');
	}
}
