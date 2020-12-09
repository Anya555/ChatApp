import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendProfileComponent } from './friend-profile/friend-profile.component';
import { CommonComponentModule } from '../common/common.module';
@NgModule({
  declarations: [FriendProfileComponent],
  imports: [CommonModule, CommonComponentModule],
  exports: [FriendProfileComponent],
})
export class FriendProfileModule {}
