import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {
  private avatarSource = new BehaviorSubject<string | ArrayBuffer | null>(null);
  currentAvatar = this.avatarSource.asObservable();

  changeAvatar(avatar: string | ArrayBuffer | null) {
    this.avatarSource.next(avatar);
  }
}