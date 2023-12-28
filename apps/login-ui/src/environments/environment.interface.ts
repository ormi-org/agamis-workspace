import ViewType from "../app/core/services/models/view-type";

interface Environment {
  production: boolean;
  apiBaseUrl: string;
  defaultView: ViewType;
  defaultOrgName?: string;
  defaultOrgId?: string;
}

export default Environment;