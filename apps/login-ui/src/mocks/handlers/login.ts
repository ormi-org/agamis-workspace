import { http, HttpResponse } from 'msw';

interface LocalAuthBody {
  identifier: string
  password: string
}

export const handlers = [
  // local authentication
  http.post<object, LocalAuthBody>('/local/auth', async ({ request }) => {
    const { identifier, password } = (await request.json());
    if (identifier !== 'admin' || password!== 'admin') {
      return new HttpResponse(null, {
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
