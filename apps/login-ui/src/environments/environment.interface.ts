interface Environment {
  production: boolean;
  apiBaseUrl: string;
  defaultView: "login" | "reset";
  defaultOrgName?: string;
  defaultOrgId?: string;
}

export default Environment;