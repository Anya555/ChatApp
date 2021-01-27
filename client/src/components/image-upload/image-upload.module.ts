import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [ImageUploadComponent],
  imports: [CommonModule, FormsModule],
  exports: [ImageUploadComponent],
})
export class ImageUploadModule {}
