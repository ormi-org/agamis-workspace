import { Component, Input, OnInit, Output } from '@angular/core';
import { environment } from '../environments/environment';
import { Context } from '@agamis/workspace/shared/login/types';
import { ContextService } from './core/services/context.service';
import { LoginPageComponent } from './core/pages/login-page/login-page.component';
import { ResetPageComponent } from './core/pages/reset-page/reset-page.component';
import { OtpPageComponent } from './core/pages/otp-page/otp-page.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  standalone: true,
  selector: 'agamis-ws-login-root',
  template: `
    <div>
      <agamis-ws-login-page-login *ngIf="(contextService.getContext() | async)?.view === 'login'" />
      <agamis-ws-login-page-reset *ngIf="(contextService.getContext() | async)?.view === 'reset'" />
      <agamis-ws-login-page-otp *ngIf="(contextService.getContext() | async)?.view === 'otp'" />
    </div>
  `,
  styleUrl: './app.component.scss',
  imports: [CommonModule, LoginPageComponent, ResetPageComponent, OtpPageComponent , AsyncPipe],
})
export class AppComponent implements OnInit {
  @Input()
  passedCtx: Context = {
    view: environment.defaultView,
    orgId: environment.defaultOrgId,
    orgName: environment.defaultOrgName,
  };
  @Output()
  loginDone: Subject<void> = new Subject<void>();

  constructor(public contextService: ContextService) {
    this.contextService.whenLoginDone().subscribe(() => this.loginDone.next());
  }

  ngOnInit(): void {
    this.contextService.setContext(this.passedCtx);
  }
}
