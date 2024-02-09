import { Component, OnInit } from '@angular/core';
import { AvatarService } from '../../services/avatar.service';
import { UserInfoService } from '../../services/user-info.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'agamis-ws-profile-tab',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-tab.component.html',
  styleUrls: ['./profile-tab.component.scss'],
})
export class ProfileTabComponent implements OnInit {
  selectedTimezone: string | undefined;
  selectedLanguage: string | undefined;
  inputFullname: string | undefined;
  inputEmail: string | undefined;
  inputJobTitle: string | undefined;
  avatarSrc: string | ArrayBuffer | undefined;
  ShowPubliclyJob = false;
  ShowPubliclyEmail = false;

  constructor(
    private avatarService: AvatarService,
    private userInfoService: UserInfoService
  ) {}

  ngOnInit() {
    this.userInfoService.fetchUserData().subscribe({
      next: ({ user }) => {
        this.selectedTimezone = user.profile?.metaProfile?.timeZone;
        this.selectedLanguage = user.profile?.metaProfile?.Language;
        this.inputFullname = user.username;
        this.inputEmail = user.profile?.mainEmail;
        this.inputJobTitle = user.profile?.metaProfile?.JobTitle;
        this.avatarSrc = user.profile?.metaProfile?.avatarSrc;
        console.log(user);
      },
      error: (err) => {
        console.error(
          'Erreur lors de la récupération des données utilisateur',
          err
        );
      },
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : undefined;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarSrc = reader.result ?? undefined;
        this.avatarService.changeAvatar(this.avatarSrc);
      };
      reader.readAsDataURL(file);
    }
  }

  /**
  Bascule la visibilité du label show publicly.*/
  toggleShowPubliclyEmail(event: MouseEvent): void {
    event.stopPropagation();
    this.ShowPubliclyEmail = !this.ShowPubliclyEmail;
  }
  toggleShowPubliclyJob(event: MouseEvent): void {
    event.stopPropagation();
    this.ShowPubliclyJob = !this.ShowPubliclyJob;
  }
}
