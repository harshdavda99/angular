import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor(private socket: Socket) { }

  public sendMessage(message: any) {
    this.socket.emit('data1', message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (message: any) =>{
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };


  public register(user: any) {
    this.socket.emit('usersign', user);
  }

  public getRegisteredUser = () => {
    this.socket.on('addtocontact', (user: any) =>{
      this.message$.next(user);
    });

    return this.message$.asObservable();
  };
}
