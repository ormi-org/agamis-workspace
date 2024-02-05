import { Component, OnInit } from '@angular/core';
import { UserInfoService } from './core/services/user-info-service';;
import { RouterOutlet } from '@angular/router';
import { NavBarComponent} from "./shared/components/nav-bar/nav-bar.component"

@Component({
    standalone: true,
    selector: 'agamis-ws-root',
    template: `
     <agamis-ws-nav-bar></agamis-ws-nav-bar>
      <div class="outlet">
        <router-outlet></router-outlet>
      </div>
    
  `,
    styleUrl: './app.component.scss',
    imports: [RouterOutlet,NavBarComponent]
})
export class AppComponent implements OnInit{
  constructor(private userInfoService: UserInfoService){}
  ngOnInit() {
    this.userInfoService.fetchUserData();
  }
}
