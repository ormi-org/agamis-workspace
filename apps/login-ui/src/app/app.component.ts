import { Component, Input } from '@angular/core';
import { environment } from '../environments/environment';
import Context from './core/services/models/context';
import { ContextService } from './core/services/context.service';
import { LoginPageComponent } from './core/pages/login-page/login-page.component';
import { ResetPageComponent } from './core/pages/reset-page/reset-page.component';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'agamis-ws-login-root',
  template: `
    <div>
      <agamis-ws-login-page-login *ngIf="(contextService.getContext() | async)?.view === 'login'" />
      <agamis-ws-login-page-reset *ngIf="(contextService.getContext() | async)?.view === 'reset'" />
    </div>
  `,
  styleUrl: './app.component.scss',
  imports: [CommonModule, LoginPageComponent, ResetPageComponent, AsyncPipe],
})
export class AppComponent {
  @Input()
  private readonly passedCtx: Context = {
    view: environment.defaultView,
    orgId: environment.defaultOrgId,
    orgName: environment.defaultOrgName,
  };

  constructor(public contextService: ContextService) {
    this.contextService.setContext(this.passedCtx);
  }
}
