export type ViewType = 'login' | 'reset' | 'otp';

export interface Context {
  view: ViewType;
  orgId?: string;
  orgName?: string;
  txId?: string;
  otpMean?: {
    type: 'mail',
    mail?: string,
  },
}

export type Oauth2Tenant =
  'oauth2-google'
  | 'oauth2-github'

export interface Oauth2TenantDefinition {
  id: Oauth2Tenant;
  label: string;
  url: string;
  redirectUrl: string;
  clientId: string;
}

export interface OidcTenantDefinition {
  id: string;
  label: string;
  url: string;
  redirectUrl: string;
  clientId: string;
}

export interface AltLoginMap {
  'oidc': OidcTenantDefinition[];
  'oauth2': Oauth2TenantDefinition[];
}