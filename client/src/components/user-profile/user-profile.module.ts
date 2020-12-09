import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FormsModule } from '@angular/forms';
import { ApiModule } from '../../utils/api/api.module';
import { CommonComponentModule } from '../common/common.module';

@NgModule({
  declarations: [UserProfileComponent],
  exports: [UserProfileComponent],
  imports: [CommonModule, FormsModule, ApiModule, CommonComponentModule],
})
export class UserProfileModule {}
