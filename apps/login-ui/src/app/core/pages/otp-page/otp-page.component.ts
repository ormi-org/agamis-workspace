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
  catchError,
  combineLatest,
  concatMap,
  interval,
  map,
  mergeMap,
  of,
  take,
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

export function isCharCodeLetter(charCode: number): boolean {
  return charCode >= 97 && charCode <= 122;
}

export function isCharCodeNumber(charCode: number): boolean {
  return charCode >= 48 && charCode <= 57;
}

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
              (keydown)="handleInputValidation($event)"
              [formControlName]="number"
            />
          </div>
          <div class="actions">
            <span [ngClass]="{ disabled: isResendTimerOn | async }">
              <span class="timer" *ngIf="isResendTimerOn | async">
                <agamis-ws-login-svg-loading-spin />
                {{ timerSeconds | async }}s
              </span>
              <button
                *ngIf="(isResendTimerOn | async) === false"
                type="button"
                class="resend"
                (click)="resendOtp()"
              >
                Resend code
              </button>
            </span>
            <div>
              <button
                data-cy="otp-submit"
                type="submit"
                class="submit"
                [disabled]="
                  (isOtpFilled$ | async) !== true || loading !== false
                "
              >
                Validate
              </button>
              <span class="error-msg">{{ errorMessage }}</span>
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

  isOtpFilled$: Observable<boolean>;

  loading: boolean = false;
  isResendTimerOn: Subject<boolean> = new ReplaySubject<boolean>(1);
  errorMessage?: string;

  timerSeconds: Subject<number> = new BehaviorSubject<number>(30);

  /**
   * Default constructor with dependencies injection.
   *
   * @param authenticationService
   * @param contextService
   * @param logApiErrorResponse
   */
  constructor(
    private authenticationService: AuthenticationService,
    private contextService: ContextService,
    private logApiErrorResponse: LogApiErrorResponse
  ) {
    this.isOtpFilled$ = this.otpForm.valueChanges.pipe(
      map((value) => {
        return Object.values(value).join('').length === 6;
      })
    );
  }

  /**
   * on init hook
   */
  ngOnInit(): void {
    // reset the timer to default cooldown
    this.resetTimer();
  }

  /**
   * Reset the timer to default cooldown.
   */
  resetTimer(): void {
    this.timerSeconds.next(30);
    this.isResendTimerOn.next(true);
    // auto signal notifier after 30 seconds
    const notifier$ = timer(30000).pipe(
      map(() => {
        // enable resend button at end of timer
        this.isResendTimerOn.next(false);
        return '30s timer done';
      })
    );
    // ticks every 1000ms
    interval(1000)
      .pipe(
        // decrease timer countdown
        withLatestFrom(this.timerSeconds),
        tap(([, time]) => {
          this.timerSeconds.next(time - 1);
        }),
        // stop at notifier signal
        takeUntil(notifier$)
      )
      .subscribe();
  }

  /**
   * Handle input validation on keyboard event for a specific field.
   *
   * @param event event to handle
   */
  handleInputValidation(event: KeyboardEvent): void {
    event.preventDefault();
    const index = (<HTMLElement>event.target).id.split('otp-')[1];
    if (event.key === 'Enter') {
      // Submit if Enter is pressed
      this.handleValidateOtp();
      return;
    }
    if (event.key === 'Backspace') {
      // Erase previous if Backspace is pressed and not at the end
      this.otpForm.patchValue({ [index]: '' });
      this.focusPreviousField(index);
      return;
    }
    if (isCharCodeLetter(event.key.charCodeAt(0))) {
      // Set control uppercase value if charCode is a letter and control is not filled
      this.otpForm.patchValue({ [index]: event.key.toLocaleUpperCase() });
      this.focusNextField(index);
      return;
    }
    if (isCharCodeNumber(event.key.charCodeAt(0))) {
      // Set control value if charCode is a number and control is not filled
      this.otpForm.patchValue({ [index]: event.key });
      this.focusNextField(index);
    }
  }

  /**
   * Focus the next field in the form.
   *
   * @param index index from which to be relative to
   */
  focusNextField(index: string): void {
    const nextId = Math.min(
      parseInt(index) + 1,
      Object.keys(this.otpForm.controls).length
    );
    document.getElementById(`otp-${nextId}`)?.focus();
  }

  /**
   * Focus the previous field in the form.
   *
   * @param index index from which to be relative to
   */
  focusPreviousField(index: string): void {
    const nextId = Math.max(parseInt(index) - 1, 0);
    document.getElementById(`otp-${nextId}`)?.focus();
  }

  /**
   * Get the login context from the context service.
   *
   * @returns an observable of the login context
   */
  getLoginContext(): Observable<Context> {
    return this.contextService.getContext();
  }

  /**
   * Ask to resend the one-time passcode.
   */
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
                unsubscribe$.next();
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

  /**
   * Handle the validation of the one-time passcode in its entierety then sends it to the authentication service.
   */
  handleValidateOtp(): void {
    console.debug('-- OtpPageComponent#handleValidateOtp() > entering method');
    this.loading = true;
    delete this.errorMessage;
    const otpInput = Object.values(this.otpForm.value).join('');
    if (otpInput.length < 6) {
      console.error(
        '<< OtpPageComponent#handleValidateOtp() - invalid otp input'
      );
      this.errorMessage = 'Make sure to fill in all passcode fields.';
      return;
    }
    combineLatest({
      otp: of(otpInput),
      ctx: this.getLoginContext().pipe(
        tap((ctx: Context) => {
          if (ctx.txId === undefined) {
            throw new Error('No txId in context');
          }
        })
      ),
    })
      .pipe(
        // take first
        take(1),
        catchError((error: Error) => {
          console.error(
            '-- OtpPageComponent#handleValidateOtp() - ',
            error.message
          );
          return throwError(
            () => <ApiErrorResponse>{ code: 0, message: error.message }
          );
        }),
        concatMap(({ otp, ctx }) => {
          // transform to otp validation request
          return this.authenticationService.validateOtp(ctx.txId!, otp);
        }),
        catchError((error: ApiErrorResponse) => {
          console.error(
            '<< OtpPageComponent#handleValidateOtp() < catched an error : ',
            this.logApiErrorResponse.apply(error)
          );
          this.loading = false;
          this.errorMessage = error.message;
          return throwError(() => error);
        })
      )
      .subscribe((resp) => {
        if (resp.action === 'ok') {
          // no more action needed: validate login
          console.debug(
            '<< OtpPageComponent#handleValidateOtp() - successful login'
          );
          this.contextService.dispatchLoginDone();
          return;
        }
        console.debug(
          '<< OtpPageComponent#handleValidateOtp() - invalid action resolved from api after providing otp'
        );
      });
  }
}
