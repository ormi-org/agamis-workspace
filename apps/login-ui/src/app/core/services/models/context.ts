import ViewType from "./view-type";

export default interface Context {
  view: ViewType;
  orgId?: string;
  orgName?: string;
}