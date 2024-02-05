import { Injectable } from '@angular/core';
import { ContextService } from './context.service';
import { Observable, switchMap, map, of } from 'rxjs';
import User from './models/user';
import Organization from './models/organization';
import { HttpClient } from '@angular/common/http';
import { API_ROUTES } from '@agamis/workspace/shared/common/types';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  constructor(
    private contextService: ContextService,
    private http: HttpClient
  ) {}

  fetchUserData(): Observable<{ user: User; org: Organization | null }> {
    return this.contextService.getWhoAmI().pipe(
      switchMap((user: User) => {
        const orgId = user.profile?.orgId;
        if (orgId) {
          return this.getOrganization(orgId).pipe(
            map((org: Organization) => ({ user, org }))
          );
        } else {
          
          return of({ user, org: null });
        }
      })
    );
  }

  private getOrganization(orgId: string): Observable<Organization> {
    return this.http.get<Organization>(`${API_ROUTES.organizations}/${orgId}`);
  }
}
