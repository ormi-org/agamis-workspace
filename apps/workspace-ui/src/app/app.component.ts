import { Component, OnInit } from '@angular/core';
import { AgamisLogoSvgComponent } from "./shared/svg/agamis-logo.svg.component";
import { AgamisTextSvgComponent } from "./shared/svg/agamis-text.svg.component";
import { UserInfoService } from './core/services/user-info-service';
import Color from './common/color';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent} from "./core/pages/nav-bar/nav-bar.component"

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
    imports: [RouterOutlet,NavBarComponent, AgamisLogoSvgComponent, AgamisTextSvgComponent]
})
export class AppComponent implements OnInit{
  constructor(private userInfoService: UserInfoService){}
  ngOnInit() {
    this.userInfoService.fetchData();
  }
  Color = Color;
}
