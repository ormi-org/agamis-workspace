import { Injectable } from '@angular/core';
import { ContextService } from './context.service';
import { Observable, switchMap, map } from 'rxjs';
import User from './models/user';
import Organization from './models/organization';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  constructor(private contextService: ContextService) {}

  fetchUserData(): Observable<{ user: User; org: Organization | undefined }> {
    return this.contextService.getWhoAmI().pipe(
      switchMap((user: User) =>
        this.contextService.getContext().pipe(
          map((ctx) => ({
            user: user,
            org: ctx.org,
          }))
        )
      )
    );
  }
}
