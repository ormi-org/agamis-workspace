import { LogApiErrorResponse } from '@agamis/workspace/shared/common/angular';
import { ApiErrorResponse } from '@agamis/workspace/shared/common/types';
import { AltLoginMap, Context } from '@agamis/workspace/shared/login/types';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  Observable,
  Subject,
  catchError,
  combineLatest,
  concatMap,
  map,
  of,
  take,
  takeUntil,
  throwError,
} from 'rxjs';
import { Color } from '@agamis/workspace/shared/common/types';
import { AgamisLogoSvgComponent } from '../../../shared/svg/agamis-logo.svg.component';
import { GithubLogoSvgComponent } from '../../../shared/svg/github-logo.svg.component';
import { GoogleLogoSvgComponent } from '../../../shared/svg/google-logo.svg.component';
import { LoadingSpinSvgComponent } from '../../../shared/svg/loading-spin.svg.component';
import { OpenedEyeSvgComponent } from '../../../shared/svg/opened-eye.svg.component';
import { AuthenticationService } from '../../services/authentication.service';
import { ContextService } from '../../services/context.service';

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
              data-cy="login-identifier"
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
              data-cy="login-password"
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
              <button
                data-cy="login-submit"
                type="submit"
                class="submit"
                [disabled]="loading"
              >
                Sign in
              </button>
            </div>
          </div>
        </form>
        <ng-container *ngIf="altLoginMap">
          <div class="or-separator">
            <div class="separator"></div>
            <span>OR</span>
            <div class="separator"></div>
          </div>
          <div class="alt-login">
            <h2 *ngIf="altLoginMap.oidc">
              {{ (getLoginContext() | async)?.orgName }}
            </h2>
            <div class="group" *ngIf="altLoginMap.oidc">
              <a *ngFor="let oidc of altLoginMap.oidc" [href]="oidc.url">{{
                oidc.label
              }}</a>
            </div>
            <div class="separator"></div>
            <h2 *ngIf="altLoginMap.oauth2">Third parties</h2>
            <div class="group" *ngIf="altLoginMap.oauth2">
              <a *ngFor="let oauth2 of altLoginMap.oauth2" [href]="oauth2.url">
                <ng-container [ngSwitch]="oauth2.id" ]>
                  <ng-container *ngSwitchCase="'oauth2-google'">
                    <agamis-ws-login-svg-google-logo />
                  </ng-container>
                  <ng-container *ngSwitchCase="'oauth2-github'">
                    <agamis-ws-login-svg-github-logo />
                  </ng-container>
                </ng-container>
                <span>{{ oauth2.label | titlecase }}</span>
              </a>
            </div>
          </div>
        </ng-container>
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
export class LoginPageComponent implements OnInit {
  Color = Color;

  loginForm = new FormGroup({
    identifier: new FormControl(''),
    password: new FormControl(''),
  });

  hidePassword: boolean = true;
  loading: boolean = false;
  errorMessage?: string;
  altLoginMap?: AltLoginMap;

  constructor(
    private authenticationService: AuthenticationService,
    private contextService: ContextService,
    private logApiErrorResponse: LogApiErrorResponse
  ) {}

  ngOnInit(): void {
    this.contextService
      .getContext()
      .pipe(
        take(1),
        concatMap((ctx: Context) => {
          if (!ctx.orgId) {
            console.error(
              '<< LoginPageComponent#ngOnInit < No orgId in context'
            );
            return throwError(() => new Error('No orgId in context'));
          }
          return this.authenticationService.getOrgAuthConfig(ctx.orgId).pipe(
            take(1),
            catchError((error: Error) => {
              console.error(
                '-- LoginPageComponent#ngOnInit() - ',
                error.message
              );
              return throwError(
                () => <ApiErrorResponse>{ code: 0, message: error.message }
              );
            })
          );
        }),
        catchError((err: ApiErrorResponse) => {
          this.logApiErrorResponse.apply(err);
          return of(<AltLoginMap>{
            oidc: [],
            oauth2: [],
          });
        })
      )
      .subscribe((map) => {
        console.debug('<< LoginPageComponent#ngOnInit < found following config', map.toString());
        this.altLoginMap = map
      });
  }

  getLoginContext(): Observable<Context> {
    return this.contextService.getContext();
  }

  goToResetView(): void {
    console.debug('-- LoginPageComponent#goToResetView() > entering method');
    const unsubscribe$ = new Subject<void>();
    this.contextService
      .getContext()
      .pipe(takeUntil(unsubscribe$))
      .subscribe((ctx: Context) => {
        console.debug(
          '-- LoginPageComponent#goToResetView() - pushing context'
        );
        this.contextService.setContext({
          ...ctx,
          view: 'reset',
        });
        // unsubscribe after first emit
        unsubscribe$.next();
      });
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
    // combine credentials and login context
    combineLatest({
      credentials: of({ identifier, password }),
      ctx: this.contextService.getContext().pipe(
        map((ctx: Context) => {
          if (ctx.orgId === undefined) {
            throw new Error('No orgId supplied');
          }
          return ctx;
        })
      ),
    })
      .pipe(
        // take first
        take(1),
        // catch eventual error (eg: no orgId)
        catchError((error: Error) => {
          console.error(
            '-- LoginPageComponent#handleLocalLogin() - ',
            error.message
          );
          return throwError(
            () => <ApiErrorResponse>{ code: 0, message: error.message }
          );
        }),
        concatMap(({ credentials, ctx }) => {
          // combine local authent result with context
          return this.authenticationService
            .localAuthenticate(
              credentials.identifier,
              credentials.password,
              ctx.orgId!
            )
            .pipe(
              map((resp) => {
                return {
                  resp,
                  ctx,
                };
              })
            );
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
      .subscribe(({ resp, ctx }) => {
        // resolve response with context based on authentication action
        if (resp.action === 'ok') {
          // no more actions needed: validate login
          console.debug(
            '<< LoginPageComponent#handleLocalLogin() < successful login'
          );
          this.contextService.dispatchLoginDone();
        } else if (resp.action === '2fa') {
          // need 2FA (otp validation)
          if (!resp.otpMean || !resp.txId) {
            console.error(
              '<< LoginPageComponent#handleLocalLogin() < API did not provide txId and otpMean'
            );
            this.errorMessage = 'No otpMean or txId provided';
            return;
          }
          console.debug(
            '<< LoginPageComponent#handleLocalLogin() < authentication process requires 2FA validation with OTP'
          );
          this.contextService.setContext({
            ...ctx,
            view: 'otp',
            txId: resp.txId,
            otpMean: resp.otpMean,
          });
        }
      });
  }
}
