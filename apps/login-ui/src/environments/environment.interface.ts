import { ViewType } from "@agamis/workspace/shared/login/types";

interface Environment {
  production: boolean;
  apiBaseUrl: string;
  defaultView: ViewType;
  defaultOrgName?: string;
  defaultOrgId?: string;
}

export default Environment;