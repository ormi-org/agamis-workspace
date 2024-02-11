import { LogApiErrorResponse } from '@agamis/workspace/shared/common/angular';
import { API_ROUTES, ApiErrorResponse } from '@agamis/workspace/shared/common/types';
import { AltLoginMap } from '@agamis/workspace/shared/login/types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import LocalAuthenticationRequest from '../models/local-authentication-request';

export interface LocalAuthentResponse {
  code: number;
  action: 'ok' | '2fa';
  txId?: string;
  otpMean?: {
    type: 'mail',
    mail?: string,
  },
}

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
  }

  /**
   * Get specific organization's authentication configuration
   *
   * @param orgId the id of the organization to retrieve the configuration from
   */
  getOrgAuthConfig(orgId: string): Observable<AltLoginMap> {
    console.debug(
      '-- AuthenticationService#getOrgAuthConfig(string) > entering method'
    );
    console.debug(
      '-- AuthenticationService#getOrgAuthConfig(string) - getting authentication config'
    );
    return this.http
      .get<{
        code: number,
        data: AltLoginMap
      }>(`${API_ROUTES.organizations}/${orgId}/auth-config`)
      .pipe(
        map((resp) => resp.data),
        catchError(this.handleLocalAuthError)
      );
  }

  /**
   * Perform a local authentication request
   *
   * @param identifier identifier of the user
   * @param password password of the user
   * @param orgId organization to log in to
   * @returns
   */
  localAuthenticate(
    identifier: string,
    password: string,
    orgId: string
  ): Observable<LocalAuthentResponse> {
    console.debug(
      '-- AuthenticationService#localAuthenticate(string, string) > entering method'
    );
    console.debug(
      '-- AuthenticationService#localAuthenticate(string, string) - submitting authentication request'
    );
    return this.http
      .post<LocalAuthentResponse>(API_ROUTES.localAuth, <LocalAuthenticationRequest>{
        identifier,
        password,
        orgId,
      })
      .pipe(catchError(this.handleLocalAuthError));
  }

  /**
   * Sends a OTP validation request to the backend
   * 
   * @param otp 
   * @returns 
   */
  validateOtp(txId: string, otp: string): Observable<LocalAuthentResponse> {
    console.debug(
      '-- AuthenticationService#validateOtp(string) > entering method'
    );
    console.debug(
      '-- AuthenticationService#validateOtp(string) - submitting otp validation request'
    );
    return this.http
     .post<LocalAuthentResponse>(API_ROUTES.otpAuth, { otp, txId })
     .pipe(catchError(this.handleLocalAuthError));
  }

  /**
   * Request API for OTP resend
   * 
   * @param txId transaction id corresponding to wanted OTP
   * @returns 
   */
  resendOtp(txId: string): Observable<LocalAuthentResponse> {
    console.debug(
      '-- AuthenticationService#resendOtp(string) > entering method'
    );
    console.debug(
      '-- AuthenticationService#resendOtp(string) - submitting otp resend request'
    );
    return this.http
   .post<LocalAuthentResponse>(API_ROUTES.otpAuth+'/resend', { txId })
   .pipe(catchError(this.handleLocalAuthError));
  }
}
