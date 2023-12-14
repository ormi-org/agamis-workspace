import { Component, ViewChild, ElementRef } from '@angular/core';
import { AvatarService } from '../../services/avatar-service';

@Component({
  selector: 'app-profile-tab',
  templateUrl: './profile-tab.component.html',
  styleUrls: ['./profile-tab.component.sass'],
})
export class ProfileTabComponent { 
  constructor(private avatarService: AvatarService) { }


  avatarSrc: string | ArrayBuffer | null = null;

  onFileSelected(event: any): void {
   const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        this.avatarSrc = reader.result;
        this.avatarService.changeAvatar(this.avatarSrc);
      };
      reader.readAsDataURL(file);
    }
  }
}
  