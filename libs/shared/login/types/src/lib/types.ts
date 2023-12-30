export type ViewType = 'login' | 'reset';

export interface Context {
  view: ViewType;
  orgId?: string;
  orgName?: string;
}
