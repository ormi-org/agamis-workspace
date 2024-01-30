export default interface Profile {
  id: string;
  firstname: string;
  lastname: string;
  mainEmail: string;
  lastLogin: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  projectsNbr: number;
  orgId: string;
}