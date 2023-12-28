import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent as LoginUI } from 'LoginUI';
import Context from '@login-ui/app/core/services/models/context';

@Component({
  selector: 'agamis-ws-page-login',
  standalone: true,
  imports: [CommonModule, LoginUI],
  template: `
  <div class="container">
    <agamis-ws-login-root [passedCtx]="ctx"/>
  </div>
  `,
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  ctx: Context = {
    view: 'login',
    orgId: 'c347683a-ac4d-46f7-86df-d7b1f881e93a',
    orgName: 'test org'
  }
}
