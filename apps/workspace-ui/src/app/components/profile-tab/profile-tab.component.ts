import { Component} from '@angular/core';
import { AvatarService } from '../../services/avatar-service';

@Component({
  selector: 'app-profile-tab',
  templateUrl: './profile-tab.component.html',
  styleUrls: ['./profile-tab.component.sass'],
})
export class ProfileTabComponent { 
  constructor(private avatarService: AvatarService) { }


  avatarSrc: string | ArrayBuffer | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarSrc = reader.result;
        this.avatarService.changeAvatar(this.avatarSrc);
      };
      reader.readAsDataURL(file);
    }
  }
}
  