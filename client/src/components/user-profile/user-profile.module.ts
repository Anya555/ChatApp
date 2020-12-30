import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FormsModule } from '@angular/forms';
import { ApiModule } from '../../utils/api/api.module';
import { CommonComponentModule } from '../common/common.module';
import { UserFriendsComponent } from './user-friends/user-friends.component';
import { MessengerModule } from '../messenger/messenger.module';
import { ChatRoomModule } from '../chat-room/chat-room.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ApiModule,
    CommonComponentModule,
    MessengerModule,
    ChatRoomModule,
  ],
  declarations: [UserProfileComponent, UserFriendsComponent],
  exports: [UserProfileComponent],
})
export class UserProfileModule {}
