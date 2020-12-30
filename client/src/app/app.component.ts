import { Component } from '@angular/core';
import { SocketIoService } from '../utils/api/socket.io.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'client';
  socketTitle = 'socketio-angular';
  constructor(private socketService: SocketIoService) {}

  ngOnInit(): void {
    window.addEventListener('error', function (event) {
      console.log(event);
    });
    this.socketService.setupSocketConnection();
  }
}
