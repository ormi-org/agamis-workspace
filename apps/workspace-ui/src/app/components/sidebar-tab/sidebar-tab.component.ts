import { Component } from '@angular/core';
import { AvatarService } from '../../services/avatar-service';

@Component({
  selector: 'app-sidebar-tab',
  templateUrl: './sidebar-tab.component.html',
  styleUrls: ['./sidebar-tab.component.sass'],
})
export class SidebarComponent {
  avatarSrc: string | ArrayBuffer | null | undefined;

  constructor(private avatarService: AvatarService) {
    this.avatarService.currentAvatar.subscribe(avatar => {
      this.avatarSrc = avatar;
    });
  }
}
