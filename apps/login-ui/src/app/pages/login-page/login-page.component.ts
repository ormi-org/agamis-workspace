import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgamisLogoSvgComponent } from '../../shared/svg/agamis-logo.svg.component';
import { OpenedEyeSvgComponent } from '../../shared/svg/opened-eye.svg.component';
import { LoadingSpinSvgComponent } from '../../shared/svg/loading-spin.svg.component';
import { Color } from '../../common/color';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'agamis-ws-login-page-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AgamisLogoSvgComponent,
    OpenedEyeSvgComponent,
    LoadingSpinSvgComponent,
    RouterLink,
  ],
  template: `
    <div>
      <div class="content">
        <div class="header">
          <div class="title">
            <div class="logo">
              <agamis-ws-login-svg-agamis-logo />
            </div>
            <h1>Sign in</h1>
          </div>
          <div class="org-label">
            <p>{{ '@' + orgName }}</p>
          </div>
        </div>
        <div class="body">
          <div class="field">
            <label>Username - or - email</label>
            <input type="text" [(ngModel)]="identifier" />
          </div>
          <div class="field">
            <label>Password</label>
            <input
              [type]="hidePassword ? 'password' : 'text'"
              [(ngModel)]="password"
            />
            <button (click)="hidePassword = !hidePassword" class="tail-button">
              <agamis-ws-login-svg-opened-eye
                [fillColor]="
                  hidePassword ? Color.SOFT_EMPHASIS : Color.PRIMARY_ONE
                "
              />
            </button>
          </div>
          <div class="actions">
            <a class="lost-pass" [routerLink]="['/password-reset']"
              >I lost my password</a
            >
            <button
              (click)="handleLogin()"
              [class]="['submit', loading ? 'loading' : '']"
            >
              <agamis-ws-login-svg-loading-spin/>
              Sign in
            </button>
          </div>
        </div>
        <div class="or-separator">
          <div class="separator"></div>
          <span>OR</span>
          <div class="separator"></div>
        </div>
        <div class="alt-login">
          <h2>{{ orgName }}</h2>
          <div class="group">
            <a [href]="">Tyria's heroes keycloak</a>
          </div>
          <div class="separator"></div>
          <div class="group">
            <a [href]="">Google</a>
            <a [href]="">GitHub</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  Color = Color;

  @Input()
  orgName: string = "Tyria's heroes";

  identifier: string = '';
  password: string = '';

  hidePassword: boolean = true;
  loading: boolean = false;

  handleLogin() {
    this.loading = true;
  }
}
