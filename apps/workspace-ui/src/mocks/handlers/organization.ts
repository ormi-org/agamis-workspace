import { delay, http, HttpResponse } from 'msw';
import UrlWrappers from '../common/url-wrappers';
import Organization from '../../app/core/services/models/organization';

interface GetOrganizationByIdParams {
  id: string;
}

const ORG_API = '/api/organizations';

export const handlers = [
  // get org by id
  http.get<GetOrganizationByIdParams, Organization>(
    UrlWrappers.wrapWithFusionApi(ORG_API + '/:id'),
    async ({ params }) => {
      const { id } = params;
      await delay(1000);
      if (!id) {
        return new HttpResponse(undefined, { status: 400 });
      }
      return HttpResponse.json(<Organization>{
        id,
        label: "test org",
        queryable: true
      }, {
        status: 200
      });
    }
  ),
];
