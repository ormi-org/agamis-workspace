import { Component, OnInit } from '@angular/core';
import { UserInfoService } from './services/user-info-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit{
  constructor(private userInfoService: UserInfoService){}

  ngOnInit() {
    this.userInfoService.fetchData();
  }
  title = 'workspace-ui';

  
}
