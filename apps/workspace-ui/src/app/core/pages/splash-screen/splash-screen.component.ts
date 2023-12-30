import { LogApiErrorResponse } from '@agamis/workspace/shared/common/angular';
import { ApiErrorResponse, isApiErrorResponse } from '@agamis/workspace/shared/common/types';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, combineLatest, of, startWith, take, throwError } from 'rxjs';
import { ContextService } from '../../services/context.service';
import { OrganizationService } from '../../services/organization.service';

@Component({
  selector: 'agamis-ws-page-splash-screen',
  standalone: true,
  imports: [CommonModule],
  template: `<p>splash-screen works!</p>`,
  styleUrl: './splash-screen.component.scss',
})
export class SplashScreenComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contextService: ContextService,
    private organizationService: OrganizationService,
    private logApiErrorResponse: LogApiErrorResponse
  ) {}

  ngOnInit(): void {
    // make initial context while fetching wanted organization metadata and loggedOnUser
    const { orgId } = this.route.snapshot.queryParams;
    if (!orgId) {
      // no orgId, redirect to not found page
      this.router.navigate(['/not-found']);
      return;
    }
    combineLatest({
      org: this.organizationService.getOrganizationById(orgId),
      loggedOnUser: this.contextService.getWhoAmI()
        .pipe(
          catchError((error: ApiErrorResponse) => {
            if (error.code === 401) {
              return of(error);
            }
            return throwError(() => error);
          })
        ),
      ctx: this.contextService.getContext().pipe(
        startWith({})
      ),
    })
      .pipe(
        take(1),
        catchError((error: ApiErrorResponse) => {
          console.error(
            '-- SplashScreenComponent#ngOnInit(ApiErrorResponse) < ',
            this.logApiErrorResponse.apply(error)
          );
          console.trace(this.logApiErrorResponse.applyWithDetails(error));
          // Todo : handle error display on splash screen
          return throwError(() => error);
        })
      )
      .subscribe(({ ctx, org, loggedOnUser }) => {
        // register organization in context
        this.contextService.setContext({ ...ctx, org });
        // navigate to login page if not logged on
        if (isApiErrorResponse(<ApiErrorResponse>loggedOnUser)) {
          return this.router.navigate(['/login']);
        } else {
          return this.router.navigate(['/workspace']);
        }
      });
  }
}
