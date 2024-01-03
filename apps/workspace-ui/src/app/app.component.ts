import { Component } from '@angular/core';
import { AgamisLogoSvgComponent } from "./shared/svg/agamis-logo.svg.component";
import { AgamisTextSvgComponent } from "./shared/svg/agamis-text.svg.component";
import Color from './common/color';
import { RouterOutlet } from '@angular/router';

@Component({
    standalone: true,
    selector: 'agamis-ws-root',
    template: `
    <div class="container">
      <div class="navbar">
        <div class="logo">
          <agamis-ws-svg-agamis-logo [fillColor]="Color.LIGHT"></agamis-ws-svg-agamis-logo>
          <agamis-ws-svg-agamis-text [fillColor]="Color.LIGHT"></agamis-ws-svg-agamis-text>
        </div>
      </div>
      <div class="outlet">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, AgamisLogoSvgComponent, AgamisTextSvgComponent]
})
export class AppComponent {
  Color = Color;
}
