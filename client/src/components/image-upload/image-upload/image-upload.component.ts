import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { UserContext } from '../../../app/userContext';
import { ApiService } from '../../../utils/api/api.service';
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
  @Output() setImageUrlEvent = new EventEmitter<void>();
  constructor(
    private firebaseStorage: AngularFireStorage,
    private userContext: UserContext,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {}

  closeImageUploadForm(): void {
    this.isImageUploadFormOpened = false;
    this.isImageUploadFormOpenedEvent.emit(this.isImageUploadFormOpened);
  }

  uploadImage(event): void {
    this.image = event.target.files[0];

    this.firebaseStorage
      .upload('image' + this.userContext.user.id, this.image)
      .then(() => {
        this.userContext.user.hasAvatarImage = true;

        this.apiService
          .updateUser(this.userContext.user.id, this.userContext.user)
          .subscribe(() => {
            this.closeImageUploadForm();
            this.setImageUrlEvent.emit();
          });
      });
  }
}
