export interface ApiErrorResponse {
  code: number;
  message: string;
  cause: string;
}

export const isApiErrorResponse = (error: ApiErrorResponse): error is ApiErrorResponse => {
  return 'code' in error && 'message' in error;
}

export const API_ROUTES = {
  localAuth: '/api/auth/local',
  otpAuth: '/api/auth/otp',
  authWhoAmI: '/api/auth/whoami',
  organizations: '/api/organizations',
};

export enum Color {
  PRIMARY_ONE = '#1E1E1E',
  PRIMARY_TWO = '#FFD03B',
  PRIMARY_THREE = '#5266FF',
  SECONDARY_ONE = '#FFA8DE',
  SECONDARY_TWO = '#F79147',
  SUCCESS = '#57AA4F',
  ERROR = '#CB2828',
  LIGHT = '#F5F1E4',
  SOFT_ANCHORING = '#EAE5D6',
  SOFT_EMPHASIS = '#D4CEBF',
  STRONG_EMPHASIS = '#52575C',
}