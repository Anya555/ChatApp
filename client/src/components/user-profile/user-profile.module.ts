import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FormsModule } from '@angular/forms';
import { ApiModule } from '../../utils/api/api.module';

@NgModule({
  declarations: [UserProfileComponent],
  exports: [UserProfileComponent],
  imports: [CommonModule, FormsModule, ApiModule],
})
export class UserProfileModule {}
