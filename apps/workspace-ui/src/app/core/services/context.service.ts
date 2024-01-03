import { LogApiErrorResponse } from '@agamis/workspace/shared/common/angular';
import { ApiErrorResponse } from '@agamis/workspace/shared/common/types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  ReplaySubject,
  Subject,
  catchError,
  throwError,
} from 'rxjs';
import API_ROUTES from '../../common/api-routes';
import Context from './models/context';
import User from './models/user';

/**
 * A singleton service for managing application global context.
 */
@Injectable({
  providedIn: 'root',
})
export class ContextService {
  /**
   * Reactive context state in the singleton.
   */
  private readonly context: Subject<Context> = new ReplaySubject<Context>();

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
   * A method used for dispatching the actualized context
   *
   * @param ctx - the context to dispatch
   */
  setContext(ctx: Context): void {
    this.context.next(ctx);
  }

  /**
   * A method to get the current context as an observable.
   *
   * @returns - the observable of the current context
   */
  getContext(): Observable<Context> {
    return this.context.asObservable();
  }

  /**
   * A method to retrieve the current logged on user.
   *
   * @returns - the logged on user or a 401 error if no user is logged on (absence of access/refresh token).
   */
  getWhoAmI(): Observable<User> {
    console.debug('-- ContextService#getWhoAmI() > entering method');
    console.debug('-- ContextService#getWhoAmI() - submitting whoami request');
    return this.http
      .get<User>(API_ROUTES.authWhoAmI)
      .pipe(catchError(this.handleError));
  }
}
