import { Component, OnInit} from '@angular/core';
import { AvatarService } from '../../services/avatar-service';
import { UserInfoService } from '../../services/user-info-service';


@Component({
  selector: 'app-profile-tab',
  templateUrl: './profile-tab.component.html',
  styleUrls: ['./profile-tab.component.sass'],
})
export class ProfileTabComponent implements OnInit { 
  userInfo: any;
  selectedTimezone: string | undefined;
  selectedLanguage: string | undefined;
  inputFullname: string | undefined;
  inputEmail: string | undefined;
  inputJobTitle: string | undefined;
  avatarSrc: string | ArrayBuffer | null | undefined ;

  constructor(
    private avatarService: AvatarService,
    private userInfoService: UserInfoService
  ) { }

  ngOnInit() {
    
    this.userInfoService.userInfos$.subscribe(data => {
     
      this.userInfo = data;
      this.selectedTimezone = data.timeZone;
      this.selectedLanguage = data.Language
      this.inputFullname = data.Fullname;
      this.inputEmail= data.email;
      this.inputJobTitle = data.JobTitle;
      this.avatarSrc = data.avatarSrc;
      
    })
  }


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
  