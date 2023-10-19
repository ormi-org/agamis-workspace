import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabManagementService {
  private activeTabSubject = new BehaviorSubject<number>(1);
  public activaTabId$ = this.activeTabSubject.asObservable();

  setActiveTab(tabNumber: number): void {
    this.activeTabSubject.next(tabNumber);
  }

  getActiveTab(): number {
    return this.activeTabSubject.value;
  }
}
