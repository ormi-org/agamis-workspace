import { delay, http, HttpResponse } from 'msw';
import UrlWrappers from '../common/url-wrappers';
import API_ROUTES from '../../app/common/api-routes';

interface LocalAuthBody {
  identifier: string
  password: string,
  orgId: string
}

export const handlers = [
  // local authentication
  http.post<object, LocalAuthBody>(UrlWrappers.wrapWithFusionApi(API_ROUTES.localAuth), async ({ request }) => {
    const { identifier, password, orgId } = (await request.json());
    await delay(1000);
    if (!identifier ||!password ||!orgId) {
      return new HttpResponse(null, { status: 400 });
    }
    if (identifier !== 'admin' || password!== 'admin') {
      return HttpResponse.json({
        code: 401,
        message: 'Invalid credentials'
      }, {
        status: 401
      });
    }
    return HttpResponse.json(null, {
      status: 200,
      headers: {
        'access_token': 'an.access.token',
        'refresh_token': 'a.refresh.token',
      }
    });
  }),
];
