import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { catchError, throwError } from 'rxjs';
import {
  API_ROUTES,
  ApiErrorResponse,
} from '@agamis/workspace/shared/common/types';
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

  describe('#getOrgAuthConfig', () => {
    it('should make GET request to get org auth config', () => {
      // Arrange
      const orgId = 'testOrgId';

      // Act
      service.getOrgAuthConfig(orgId).subscribe();

      // Assert
      const req = httpTestingController.expectOne(
        `${API_ROUTES.organizations}/${orgId}/auth-config`
      );
      expect(req.request.method).toEqual('GET');
    });

    it('should return ApiErrorResponse on http error', (done) => {
      // Arrange
      const orgId = 'testOrgId';

      // Act
      service.getOrgAuthConfig(orgId).subscribe({
        error: (err: ApiErrorResponse) => {
          // Assert
          expect(err).toEqual(<ApiErrorResponse>{
            code: 500,
            message: 'A technical error occured',
          });
          done();
        },
      });

      // Assert
      const req = httpTestingController.expectOne(
        `${API_ROUTES.organizations}/${orgId}/auth-config`
      );
      req.flush(null, { status: 500, statusText: 'Server Error' });
    });
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
      const req = httpTestingController.expectOne(API_ROUTES.localAuth);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ identifier, password, orgId });
      req.flush(null, { status: 404, statusText: 'Not found' });
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
      const req = httpTestingController.expectOne(API_ROUTES.localAuth);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ identifier, password, orgId });
      req.flush(
        { code: 401, message: 'Invalid credentials' },
        { status: 401, statusText: 'Unauthorized' }
      );
    });
  });

  describe('#getOrgAuthConfig', () => {});

  describe('#localAuthenticate', () => {
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
      const req = httpTestingController.expectOne(API_ROUTES.localAuth);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ identifier, password, orgId });
      req.flush(null, { status: 404, statusText: 'Not found' });
    });

    it('should be called and return alt login map when no error', () => {
      // given
      const identifier = 'test';
      const password = 'password';
      const orgId = '4f02da7a-d3a3-4384-8ee4-5b1cc49467ce';

      // when
      service
        .localAuthenticate(identifier, password, orgId)
        .subscribe((data) => {
          // then
          expect(data).toEqual({
            txId: 'test',
            altLoginMap: {
              test: 'test',
            },
          });
        });

      // then
      const req = httpTestingController.expectOne(API_ROUTES.localAuth);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ identifier, password, orgId });
      req.flush(
        {
          code: 200,
          data: {
            test: 'test',
          },
        },
        { status: 404, statusText: 'Not found' }
      );
    });
  });

  describe('#validateOtp', () => {
    it('should be called and return raw error if no ApiError is provided', () => {
      // given
      const txId = 'test';
      const otp = '123456';

      // when
      service
        .validateOtp(txId, otp)
        .pipe(
          catchError((error: ApiErrorResponse) => {
            // then
            expect(error.code).toBe(404);
            expect(error.message).toBe('A technical error occured');
            return throwError(() => error);
          })
        )
        .subscribe();

      // then
      const req = httpTestingController.expectOne(API_ROUTES.otpAuth);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ otp, txId });
      req.flush(null, { status: 404, statusText: 'Not found' });
    });

    it('should be called and return ApiError when provided', () => {
      // given
      const txId = 'test';
      const otp = '123456';

      // when
      service
        .validateOtp(txId, otp)
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
      const req = httpTestingController.expectOne(API_ROUTES.otpAuth);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ otp, txId });
      req.flush(
        { code: 401, message: 'Invalid credentials' },
        { status: 401, statusText: 'Unauthorized' }
      );
    });
  });

  describe('#resendOtp', () => {
    it('should be called and return raw error if no ApiError is provided', () => {
      // given
      const txId = 'test';

      // when
      service
        .resendOtp(txId)
        .pipe(
          catchError((error: ApiErrorResponse) => {
            // then
            expect(error.code).toBe(404);
            expect(error.message).toBe('A technical error occured');
            return throwError(() => error);
          })
        )
        .subscribe();

      // then
      const req = httpTestingController.expectOne(
        `${API_ROUTES.otpAuth}/resend`
      );
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ txId });
      req.flush(null, { status: 404, statusText: 'Not found' });
    });

    it('should be called and return ApiError when provided', () => {
      // given
      const txId = 'test';

      // when
      service
        .resendOtp(txId)
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
        `${API_ROUTES.otpAuth}/resend`
      );
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ txId });
      req.flush(
        { code: 401, message: 'Invalid credentials' },
        { status: 401, statusText: 'Unauthorized' }
      );
    });
  });
});
