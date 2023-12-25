export default interface Context {
  view: "login" | "reset";
  orgId?: string;
  orgName?: string;
}