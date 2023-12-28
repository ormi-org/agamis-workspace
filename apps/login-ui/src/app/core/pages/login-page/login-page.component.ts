import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  Observable,
  catchError,
  combineLatest,
  map,
  mergeMap,
  of,
  take,
  throwError
} from 'rxjs';
import Color from '../../../common/color';
import LogApiErrorResponse from '../../../common/functions/log-api-error-response';
import { AgamisLogoSvgComponent } from '../../../shared/svg/agamis-logo.svg.component';
import { GithubLogoSvgComponent } from '../../../shared/svg/github-logo.svg.component';
import { GoogleLogoSvgComponent } from '../../../shared/svg/google-logo.svg.component';
import { LoadingSpinSvgComponent } from '../../../shared/svg/loading-spin.svg.component';
import { OpenedEyeSvgComponent } from '../../../shared/svg/opened-eye.svg.component';
import ApiErrorResponse from '../../models/api-error-response';
import { AuthenticationService } from '../../services/authentication.service';
import { ContextService } from '../../services/context.service';
import Context from '../../services/models/context';

@Component({
  selector: 'agamis-ws-login-page-login',
  standalone: true,
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
            <p>{{ '@' + (getLoginContext() | async)?.orgName }}</p>
          </div>
        </div>
        <form
          class="body"
          [formGroup]="loginForm"
          (ngSubmit)="handleLocalLogin()"
        >
          <div class="field">
            <label for="identifier">Username - or - email</label>
            <input
              id="identifier"
              name="identifier"
              type="text"
              formControlName="identifier"
              autocomplete="username"
            />
          </div>
          <div class="field">
            <label for="password">Password</label>
            <input
              id="password"
              name="password"
              [type]="hidePassword ? 'password' : 'text'"
              formControlName="password"
              autocomplete="current-password" 
            />
            <button
              type="button"
              (click)="hidePassword = !hidePassword"
              class="tail-button"
            >
              <agamis-ws-login-svg-opened-eye
                [fillColor]="
                  hidePassword ? Color.SOFT_EMPHASIS : Color.PRIMARY_ONE
                "
              />
            </button>
          </div>
          <div class="actions">
            <button type="button" class="lost-pass" (click)="goToResetView()">
              I lost my password
            </button>
            <div>
              <span class="error-msg">{{ errorMessage }}</span>
              <agamis-ws-login-svg-loading-spin *ngIf="loading" />
              <button type="submit" class="submit" [disabled]="loading">
                Sign in
              </button>
            </div>
          </div>
        </form>
        <div class="or-separator">
          <div class="separator"></div>
          <span>OR</span>
          <div class="separator"></div>
        </div>
        <div class="alt-login">
          <h2>{{ (getLoginContext() | async)?.orgName }}</h2>
          <div class="group">
            <a [href]="">keycloak main instance</a>
          </div>
          <div class="separator"></div>
          <h2>Third parties</h2>
          <div class="group">
            <a [href]=""
              ><agamis-ws-login-svg-google-logo class="icon" />
              <span>Google</span></a
            >
            <a [href]=""
              ><agamis-ws-login-svg-github-logo class="icon" />
              <span>GitHub</span></a
            >
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './login-page.component.scss',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgamisLogoSvgComponent,
    OpenedEyeSvgComponent,
    LoadingSpinSvgComponent,
    GoogleLogoSvgComponent,
    GithubLogoSvgComponent,
  ],
})
export class LoginPageComponent {
  Color = Color;

  loginForm = new FormGroup({
    identifier: new FormControl(''),
    password: new FormControl(''),
  });

  hidePassword: boolean = true;
  loading: boolean = false;
  errorMessage: string | undefined = undefined;

  constructor(
    private authenticationService: AuthenticationService,
    private contextService: ContextService,
    private logApiErrorResponse: LogApiErrorResponse
  ) {}

  getLoginContext(): Observable<Context> {
    return this.contextService.getContext();
  }

  goToResetView(): void {
    console.debug('-- LoginPageComponent#goToResetView() > entering method');
    this.contextService
      .getContext()
      .pipe(take(1))
      .subscribe((ctx: Context) => {
        console.debug(
          '-- LoginPageComponent#goToResetView() - pushing context'
        );
        this.contextService.setContext({
          ...ctx,
          view: 'reset',
        });
      })
      .unsubscribe();
  }

  handleLocalLogin() {
    console.debug('>> LoginPageComponent#handleLocalLogin() > entering method');
    this.loading = true;
    delete this.errorMessage;
    console.debug(
      '-- LoginPageComponent#handleLocalLogin() - verifying input credentials'
    );
    const { identifier, password } = this.loginForm.value;
    if (!identifier || !password) {
      console.error(
        '<< LoginPageComponent#handleLocalLogin() < no credentials provided'
      );
      this.errorMessage = 'Please provide your credentials';
      this.loading = false;
      return;
    }
    console.debug(
      '-- LoginPageComponent#handleLocalLogin() - using local authentication'
    );
    combineLatest({
      credentials: of({ identifier, password }),
      orgId: this.contextService.getContext().pipe(
        map((ctx: Context) => {
          if (ctx.orgId === undefined) {
            throw new Error('No orgId supplied');
          }
          return ctx.orgId;
        })
      ),
    })
      .pipe(
        take(1),
        catchError((error: Error) => {
          console.error(
            '-- LoginPageComponent#handleLocalLogin() - ',
            error.message
          );
          return throwError(
            () => <ApiErrorResponse>{ code: 0, message: error.message }
          );
        }),
        mergeMap(({ credentials, orgId }) => {
          return this.authenticationService
            .localAuthenticate(
              credentials.identifier,
              credentials.password,
              orgId
            )
        }),
        catchError((error: ApiErrorResponse) => {
          console.error(
            '<< LoginPageComponent#handleLocalLogin() < catched an error : ' +
              this.logApiErrorResponse.apply(error)
          );
          this.loading = false;
          this.errorMessage = error.message;
          return throwError(() => error);
        })
      )
      .subscribe(() => {
        console.debug(
          '<< LoginPageComponent#handleLocalLogin() < successful login'
        );
        this.contextService.dispatchLoginDone();
      })
  }
}
