import { LogApiErrorResponse } from '@agamis/workspace/shared/common/angular';
import { API_ROUTES, ApiErrorResponse } from '@agamis/workspace/shared/common/types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Organization from './models/organization';

/**
 * A singleton service for retrieving organization informations.
 */
@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  constructor(
    private http: HttpClient,
    private logApiErrorResponse: LogApiErrorResponse
  ) {}

  /**
   * A private method to handle error logging and transform to universal api error response.
   *
   * @param error - the http error to handle
   * @returns - the api error response
   */
  private handleError = (error: HttpErrorResponse) => {
    const apiError = error.error as ApiErrorResponse;
    if (!apiError) {
      // catch and map generic http errors
      console.error(
        '-- OrganizationService#handleError(HttpErrorResponse) < Had an unexpected error : ',
        error.message
      );
      console.trace(error);
      return throwError(
        () =>
          <ApiErrorResponse>{
            code: error.status,
            message: error.message || 'A technical error occured',
          }
      );
    }
    console.error(
      '-- OrganizationService#handleError(HttpErrorResponse) < ',
      this.logApiErrorResponse.apply(apiError)
    );
    console.trace(this.logApiErrorResponse.applyWithDetails(apiError));
    return throwError(() => apiError);
  };

  /**
   * A method for getting an organization by its id.
   *
   * @param orgId - the id of the organization to retrieve
   * @returns - an observable of the organization as a result of a rest request
   */
  getOrganizationById(orgId: string): Observable<Organization> {
    console.debug(
      '-- OrganizationService#getOrganizationById(string) > entering method'
    );
    console.debug(
      '-- OrganizationService#getOrganizationById(string) - submitting request'
    );
    return this.http
      .get<Organization>(API_ROUTES.organizations + '/' + orgId)
      .pipe(catchError(this.handleError));
  }
}
