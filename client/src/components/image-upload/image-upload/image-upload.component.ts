import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

interface Image {
  lastModified: number;
  lastModifiedDate: string;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
})
export class ImageUploadComponent implements OnInit {
  image: Image;
  @Input() isImageUploadFormOpened: boolean;
  @Output() isImageUploadFormOpenedEvent = new EventEmitter<boolean>();
  constructor(private firebaseStorage: AngularFireStorage) {}

  ngOnInit(): void {}

  closeImageUploadForm(): void {
    this.isImageUploadFormOpened = false;
    this.isImageUploadFormOpenedEvent.emit(this.isImageUploadFormOpened);
  }

  uploadImage(event): void {
    this.image = event.target.files[0];
    this.firebaseStorage
      .ref('images')
      .put(this.image)
      .then(() => {
        this.closeImageUploadForm();
      });
  }
}
