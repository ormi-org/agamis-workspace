interface Environment {
  production: boolean;
  apiBaseUrl: string;
  defaultOrgName?: string;
  defaultOrgId?: string;
}

export default Environment;
