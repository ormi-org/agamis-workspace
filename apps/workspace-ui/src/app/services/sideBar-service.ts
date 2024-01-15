import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SideBarService {
  private showSideMenuSubject = new BehaviorSubject<boolean>(false);
  showSideMenu$ = this.showSideMenuSubject.asObservable();

  toggleSideMenu() {
    this.showSideMenuSubject.next(!this.showSideMenuSubject.value);
  }

  closeSideMenu() {
    this.showSideMenuSubject.next(false);
  }
}