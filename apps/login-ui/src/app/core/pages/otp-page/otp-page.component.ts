import { LogApiErrorResponse } from '@agamis/workspace/shared/common/angular';
import { ApiErrorResponse, Color } from '@agamis/workspace/shared/common/types';
import { Context } from '@agamis/workspace/shared/login/types';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  Subject,
  interval,
  map,
  mergeMap,
  takeUntil,
  tap,
  throwError,
  timer,
  withLatestFrom,
} from 'rxjs';
import { AgamisLogoSvgComponent } from '../../../shared/svg/agamis-logo.svg.component';
import { LoadingSpinSvgComponent } from '../../../shared/svg/loading-spin.svg.component';
import { OpenedEyeSvgComponent } from '../../../shared/svg/opened-eye.svg.component';
import { AuthenticationService } from '../../services/authentication.service';
import { ContextService } from '../../services/context.service';

@Component({
  selector: 'agamis-ws-login-page-otp',
  standalone: true,
  template: `
    <div>
      <div class="content">
        <div class="header">
          <div class="title">
            <div class="logo">
              <agamis-ws-login-svg-agamis-logo />
            </div>
            <h1>Enter your passcode</h1>
          </div>
          <div class="org-label" *ngIf="(getLoginContext() | async)?.orgName">
            <p>{{ '@' + (getLoginContext() | async)?.orgName }}</p>
          </div>
        </div>
        <p>
          To finalize the authentication process, enter the one-time passcode
          sent to your email address cha********&#64;tyr**.com
        </p>
        <form
          class="body"
          [formGroup]="otpForm"
          (ngSubmit)="handleValidateOtp()"
        >
          <div class="fields">
            <input
              *ngFor="let number of [0, 1, 2, 3, 4, 5]"
              [attr.data-cy]="'otp-' + number"
              [attr.id]="'otp-' + number"
              type="text"
              maxlength="1"
              (keydown)="
                handleInputValidation($event) ? focusNextField() : null
              "
              [attr.formControlName]="number"
            />
          </div>
          <div class="actions">
            <span [ngClass]="{ 'disabled': isResendTimerOn | async }">
              <span class="timer" *ngIf="isResendTimerOn | async">
                <agamis-ws-login-svg-loading-spin />
                {{ timerSeconds | async }}s
              </span>
              <button type="button" class="resend" (click)="resendOtp()">
                Resend code
              </button>
            </span>
            <div>
              <span class="error-msg">{{ errorMessage }}</span>
              <button
                data-cy="otp-submit"
                type="submit"
                class="submit"
                [disabled]="loading"
              >
                Validate
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
  styleUrl: './otp-page.component.scss',
  imports: [
    CommonModule,
    AgamisLogoSvgComponent,
    OpenedEyeSvgComponent,
    LoadingSpinSvgComponent,
    ReactiveFormsModule,
  ],
})
export class OtpPageComponent implements OnInit {
  Color = Color;

  otpForm = new FormGroup({
    0: new FormControl(''),
    1: new FormControl(''),
    2: new FormControl(''),
    3: new FormControl(''),
    4: new FormControl(''),
    5: new FormControl(''),
  });

  loading: boolean = false;
  isResendTimerOn: Subject<boolean> = new ReplaySubject<boolean>(1);
  errorMessage?: string;

  timerSeconds: Subject<number> = new BehaviorSubject<number>(30);

  constructor(
    private authenticationService: AuthenticationService,
    private contextService: ContextService,
    private logApiErrorResponse: LogApiErrorResponse
  ) {}

  ngOnInit(): void {
    this.resetTimer();
  }

  resetTimer(): void {
    this.timerSeconds.next(30);
    this.isResendTimerOn.next(true);
    const notifier$ = timer(30000).pipe(
      map(() => {
        // enable resend button at end of timer
        this.isResendTimerOn.next(false);
        return '30s timer done';
      })
    );
    interval(1000)
      .pipe(
        withLatestFrom(this.timerSeconds),
        tap(([, time]) => {
          this.timerSeconds.next(time - 1);
          console.debug('<< OtpPageComponent#timer < timer ticks')
        }),
        takeUntil(notifier$)
      )
      .subscribe();
  }

  handleInputValidation(event: KeyboardEvent): boolean {
    if (event.key === 'Enter') {
      this.handleValidateOtp();
    }
    return false;
  }

  focusNextField() {}

  getLoginContext(): Observable<Context> {
    return this.contextService.getContext();
  }

  resendOtp(): void {
    console.debug('-- OtpPageComponent#resendOtp() > entering method');
    const unsubscribe$ = new Subject<void>();
    this.contextService
      .getContext()
      .pipe(
        takeUntil(unsubscribe$),
        mergeMap((ctx: Context) => {
          console.debug('-- OtpPageComponent#resendOtp() - ask for otp resend');
          if (!ctx.txId) {
            console.error(
              '-- OtpPageComponent#resendOtp() - no txId passed to context'
            );
            return throwError(
              () =>
                <ApiErrorResponse>{
                  code: 0,
                  message:
                    'Context does not have the authentication transaction Id',
                }
            ).pipe(
              tap(() => {
                // come back to login screen if precondition failed because otp cannot complete without txId
                this.contextService.setContext({
                  ...ctx,
                  txId: undefined,
                  view: 'login',
                });
              })
            );
          }
          this.resetTimer();
          return this.authenticationService.resendOtp(ctx.txId);
        })
      )
      .subscribe(() => {
        console.debug('-- OtpPageComponent#resendOtp() - resent OTP');
        // unsubscribe after first emit
        unsubscribe$.next();
      });
  }

  handleValidateOtp() {}
}
