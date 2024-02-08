import { delay, http, HttpResponse } from 'msw';
import UrlWrappers from '../common/url-wrappers';
import User from '../../app/core/services/models/user';

const WHO_AM_I = '/api/auth/whoami';

export const handlers = [
  // get current logon user
  http.get<object, User>(
    UrlWrappers.wrapWithFusionApi(WHO_AM_I),
    async ({ cookies }) => {
      const { access_token, refresh_token } = cookies;
      await delay(1000);
      if (!access_token && !refresh_token) {
        return new HttpResponse(undefined, { status: 401 });
      }
      return HttpResponse.json(<User>{
        id: "5fc21c59-9af3-4efa-b386-73d94f6d2ad7",
        username: "admin",
        createdAt: Date.now().toString(),
        updatedAt: Date.now().toString(),
        profile: {
          id: "32474475-f6a5-416e-915d-b975c433523e",
          firstname: "admin",
          lastname: "admin",
          mainEmail: "admin@example.com",
          isActive: true,
          lastLogin: Date.now().toString(),
          createdAt: Date.now().toString(),
          updatedAt: Date.now().toString(),
        }
      }, {
        status: 200
      });
    }
  ),
];
