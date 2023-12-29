import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
// TODO: make Context class publicly accessible (dedicated package)
// eslint-disable-next-line @nx/enforce-module-boundaries
import LoginContext from '@login-ui/app/core/services/models/context';
import { Subject, map, take } from 'rxjs';
import { Router } from '@angular/router';
import { ContextService } from '../../services/context.service';
import Context from '../../services/models/context';
import Organization from '../../services/models/organization';

@Component({
  selector: 'agamis-ws-page-login',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="container">
    <div #loginPlaceholder></div>
  </div>
  `,
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {

  @ViewChild('loginPlaceholder', { read: ViewContainerRef })
  loginViewContainer!: ViewContainerRef;

  loginDoneEventSubject: Subject<void> = new Subject<void>();

  constructor(private router: Router, private contextService: ContextService) {}

  async ngOnInit(): Promise<void> {
    this.loginDoneEventSubject.subscribe(() => {
      console.debug("<< LoginPageComponent#loginDoneEventSubject < catched loginDone event");
      this.router.navigate(['/workspace']);
    });
    this.contextService.getContext()
      .pipe(
        take(1),
        map((ctx: Context) => ctx.org),
      )
      .subscribe(async (org: Organization) => {
        const loginUi = await import('login-ui/Component');
        const loginView = this.loginViewContainer.createComponent(loginUi.AppComponent);
        loginView.instance.passedCtx = <LoginContext>{
          view: 'login',
          orgId: org.id,
          orgName: org.label
        };
        loginView.instance.loginDone = this.loginDoneEventSubject;
      })
  }
}
