import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SocketIoService {
  socket;
  constructor() {}
  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.on('message', (data: string) => {
      console.log(data);
    });
  }
}
