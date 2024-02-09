import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { catchError, throwError } from 'rxjs';
import { API_ROUTES, ApiErrorResponse } from '@agamis/workspace/shared/common/types';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthenticationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#handleLocalError', () => {
    it('should be called and return raw error if no ApiError is provided', () => {
      // given
      const identifier = 'test';
      const password = 'password';
      const orgId = '4f02da7a-d3a3-4384-8ee4-5b1cc49467ce';

      // when
      service
        .localAuthenticate(identifier, password, orgId)
        .pipe(
          catchError((error: ApiErrorResponse) => {
            // then
            expect(error.code).toBe(404);
            expect(error.message).toBe('Invalid credentials');
            return throwError(() => error);
          })
        )
        .subscribe();

      // then
      const req = httpTestingController.expectOne(
        API_ROUTES.localAuth
      );
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ identifier, password, orgId });
      req.flush(null, { status: 404, statusText: "Not found" });
    });

    it('should be called and return ApiError when provided', () => {
      // given
      const identifier = 'test';
      const password = 'password';
      const orgId = '4f02da7a-d3a3-4384-8ee4-5b1cc49467ce';

      // when
      service
        .localAuthenticate(identifier, password, orgId)
        .pipe(
          catchError((error: ApiErrorResponse) => {
            // then
            expect(error.code).toBe(401);
            expect(error.message).toBe('Invalid credentials');
            return throwError(() => error);
          })
        )
        .subscribe();
      // then
      const req = httpTestingController.expectOne(
        API_ROUTES.localAuth
      );
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ identifier, password, orgId });
      req.flush({ code: 401, message: 'Invalid credentials' }, { status: 401, statusText: "Unauthorized" });
    });
  });
});
