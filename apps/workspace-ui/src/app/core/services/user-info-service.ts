import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  private dataSubject = new BehaviorSubject<any>(null);
  userInfos$: Observable<any> = this.dataSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  fetchData() {
    this.httpClient.get('/api/user/infos').subscribe(data => {
      this.dataSubject.next(data);
    });
  }
  
}
