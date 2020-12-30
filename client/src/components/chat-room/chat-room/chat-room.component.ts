import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css'],
})
export class ChatRoomComponent implements OnInit {
  @Input() isChatRoomOpened: boolean;
  @Output() isChatRoomOpenedEvent = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}
  closePrivateChatRoom(): void {
    this.isChatRoomOpened = false;
    this.isChatRoomOpenedEvent.emit(this.isChatRoomOpened);
  }
}
