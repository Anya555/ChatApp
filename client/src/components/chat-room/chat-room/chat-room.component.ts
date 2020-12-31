import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../../utils/api/api.service';
import { User, UserContext } from '../../../app/userContext';
@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css'],
})
export class ChatRoomComponent implements OnInit {
  @Input() isChatRoomOpened: boolean;
  @Input() friendId: number;
  @Output() isChatRoomOpenedEvent = new EventEmitter<boolean>();
  constructor(
    private apiService: ApiService,
    private userContext: UserContext
  ) {}

  ngOnInit(): void {
    this.getChatHistory();
  }
  closePrivateChatRoom(): void {
    this.isChatRoomOpened = false;
    this.isChatRoomOpenedEvent.emit(this.isChatRoomOpened);
  }

  onSubmit(f: NgForm): void {
    let messageData = {
      message: f.value.message,
      userId: this.userContext.user.id,
      friendId: this.friendId,
    };

    this.apiService.saveMessageToDB(messageData).subscribe((data) => {
      console.log(data);
    });
  }

  getChatHistory(): void {
    this.apiService
      .getChatHistory(this.userContext.user.id, this.friendId)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
