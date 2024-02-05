import { LogApiErrorResponse } from '@agamis/workspace/shared/common/angular';
import { API_ROUTES, ApiErrorResponse } from '@agamis/workspace/shared/common/types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import LocalAuthenticationRequest from '../models/local-authentication-request';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private logApiErrorResponse: LogApiErrorResponse
  ) {}

  /**
   * Handle error logging
   *
   * @param error - the error to handle
   * @returns
   */
  private handleLocalAuthError = (error: HttpErrorResponse) => {
    const apiError = error.error as ApiErrorResponse;
    if (!apiError) {
      // catch and map generic http errors
      console.error(
        '-- AuthenticationService#localAuthenticate(string, string) < Had an unexpected error : ',
        error.message
      );
      console.trace(error);
      return throwError(
        () =>
          <ApiErrorResponse>{
            code: error.status,
            message: 'A technical error occured',
          }
      );
    }
    console.error(
      '-- AuthenticationService#localAuthenticate(string, string) < ',
      this.logApiErrorResponse.apply(apiError)
    );
    console.trace(this.logApiErrorResponse.applyWithDetails(apiError));
    return throwError(() => apiError);
  };

  localAuthenticate(
    identifier: string,
    password: string,
    orgId: string
  ): Observable<void> {
    console.debug(
      '-- AuthenticationService#localAuthenticate(string, string) > entering method'
    );
    console.debug(
      '-- AuthenticationService#localAuthenticate(string, string) - submitting authentication request'
    );
    return this.http
      .post<void>(API_ROUTES.localAuth, <LocalAuthenticationRequest>{
        identifier,
        password,
        orgId,
      })
      .pipe(catchError(this.handleLocalAuthError));
  }
}
