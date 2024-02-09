import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {
  private avatarSource = new BehaviorSubject<string | ArrayBuffer | undefined>(undefined);
  currentAvatar = this.avatarSource.asObservable();

  changeAvatar(avatar: string | ArrayBuffer | undefined) {
    this.avatarSource.next(avatar);
  }
}