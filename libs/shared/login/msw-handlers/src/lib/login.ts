import { delay, http, HttpResponse } from 'msw';
import { UrlWrappers } from '@agamis/workspace/shared/common/msw-handlers';
import { AltLoginMap } from '@agamis/workspace/shared/login/types';
import { v4 as uuid } from 'uuid';
import { from, mergeMap, reduce, take, map, firstValueFrom } from 'rxjs';

interface LocalAuthBody {
  identifier: string;
  password: string;
  orgId: string;
}

function random6charOtp() {
  const rand = crypto.getRandomValues(new Uint8Array(16));

  return firstValueFrom(
    from(rand).pipe(
      reduce((acc, v) => {
        return acc + '' + v.toString();
      }, ''),
      mergeMap((r: string) => {
        return from(Array.from(r.split('')));
      }),
      take(36),
      reduce((acc, v, i) => {
        acc[Math.round(i / 2 + 0.5) - 1] = [
          ...(acc[Math.round(i / 2 + 0.5) - 1] || []),
          v,
        ];
        return acc;
      }, <string[][]>[]),
      mergeMap((array) => {
        return from(
          array.reverse().map((v) => (parseInt(v[0]) * parseInt(v[1])) % 36)
        );
      }),
      map((v) => {
        if (v > 9) {
          return String.fromCharCode(v + 55);
        } else {
          return v.toString();
        }
      }),
      take(6),
      reduce((acc, v) => acc + '' + v)
    )
  );
}

const NO_2FA_ORG = 'e89c708f-462a-4d11-bf87-487f9fc01889';
const _2FA_ORG = 'e89c708f-462a-4d11-bf87-487f9fc01880';

const LOCAL_AUTH = '/api/auth/local';
const AUTH_CONF =
  '/api/organizations/e89c708f-462a-4d11-bf87-487f9fc01889/auth-config';

const AUTH_OTP = '/api/auth/otp';

const OtpMap: Map<string, string> = new Map();

export const handlers = [
  // auth conf
  http.get<object>(UrlWrappers.wrapWithFusionApi(AUTH_CONF), async () => {
    await delay(1000);
    return HttpResponse.json(
      {
        code: 200,
        data: <AltLoginMap>{
          oauth2: [
            {
              id: 'oauth2-google',
              label: 'Google',
              url: 'https://accounts.google.com/o/oauth2/auth',
              redirectUrl: 'http://localhost:4200',
              clientId: '<KEY>',
            },
            {
              id: 'oauth2-github',
              label: 'GitHub',
              url: 'https://github.com/login/oauth/authorize',
              redirectUrl: 'http://localhost:4200',
              clientId: '<KEY>',
            },
          ],
          oidc: [
            {
              id: 'oidc-keycloak-main',
              label: 'keycloak main instance',
              url: 'https://idp.agamis.local/auth/realms/agamis',
              redirectUrl: 'http://localhost:4200',
              clientId: '<KEY>',
            },
          ],
        },
      },
      {
        status: 200,
      }
    );
  }),
  // local authentication
  http.post<object, LocalAuthBody>(
    UrlWrappers.wrapWithFusionApi(LOCAL_AUTH),
    async ({ request }) => {
      const { identifier, password, orgId } = await request.json();
      await delay(1000);
      if (!identifier || !password || !orgId) {
        return new HttpResponse(null, { status: 400 });
      }
      if (identifier !== 'admin' || password !== 'admin') {
        return HttpResponse.json(
          {
            code: 401,
            message: 'Invalid credentials',
          },
          {
            status: 401,
          }
        );
      }
      if (orgId === _2FA_ORG) {
        const txId = uuid();
        const otp = await random6charOtp();
        console.log(
          `MSW - handlers - login - HTTP POST ${LOCAL_AUTH} - txId: ${txId} : OTP is ${otp}`
        );
        OtpMap.set(txId, otp);
        return HttpResponse.json(
          {
            code: 201,
            action: '2fa',
            txId: txId,
            otpMean: {
              type: 'mail',
              mail: 'asam***@gm***.com',
            },
          },
          {
            status: 201,
          }
        );
      } else if (orgId === NO_2FA_ORG) {
        const headers = new Headers();
        headers.append(
          'Set-Cookie',
          'access_token=an.access.token; HttpOnly; SameSite=Strict; Secure;'
        );
        headers.append(
          'Set-Cookie',
          'refresh_token=a.refresh.token; HttpOnly; SameSite=Strict; Secure;'
        );
        return HttpResponse.json(
          {
            code: 200,
            action: 'ok',
            txId: uuid(),
          },
          {
            status: 200,
            headers: headers,
          }
        );
      } else {
        return HttpResponse.json(
          {
            code: 401,
            message: 'Invalid credentials',
          },
          {
            status: 401,
          }
        );
      }
    }
  ),
  // otp
  http.post<object, { otp: string; txId: string }>(
    UrlWrappers.wrapWithFusionApi(AUTH_OTP),
    async ({ request }) => {
      await delay(1000);
      const { otp, txId } = await request.json();
      if (!otp ||!txId) {
        return new HttpResponse(null, { status: 400 });
      }
      if (!OtpMap.has(txId)) {
        return new HttpResponse(null, { status: 400 });
      }
      if (otp !== OtpMap.get(txId)) {
        return HttpResponse.json({
          code: 401,
          message: 'Invalid OTP',
        }, { status: 401 });
      } else {
        const headers = new Headers();
        headers.append(
          'Set-Cookie',
          'access_token=an.access.token; HttpOnly; SameSite=Strict; Secure;'
        );
        headers.append(
          'Set-Cookie',
          'refresh_token=a.refresh.token; HttpOnly; SameSite=Strict; Secure;'
        );
        return HttpResponse.json(
          {
            code: 200,
            action: 'ok',
            txId: uuid(),
          },
          {
            status: 200,
            headers: headers,
          }
        );
      }
    }
  ),
  // otp resend
  http.post<object, { txId: string }>(
    UrlWrappers.wrapWithFusionApi(AUTH_OTP+'/resend'),
    async ({ request }) => {
      const { txId } = await request.json();
      if (!txId) {
        return new HttpResponse(null, { status: 400 });
      }
      if (!OtpMap.has(txId)) {
        return new HttpResponse(null, { status: 400 });
      }
      console.log(
        `MSW - handlers - login - HTTP POST ${LOCAL_AUTH} - txId: ${txId} : OTP is ${OtpMap.get(txId)}`
      );
      return HttpResponse.json(
        {
          code: 200,
          action: '2fa',
          txId: uuid(),
        },
        {
          status: 200
        }
      );
    }
  ),
];
