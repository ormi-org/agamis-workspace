import Profile from "./profile";

export default interface User {
  id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  profile?: Profile;
}