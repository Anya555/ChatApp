import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [ChatRoomComponent],
  imports: [CommonModule, FormsModule],
  exports: [ChatRoomComponent],
})
export class ChatRoomModule {}
