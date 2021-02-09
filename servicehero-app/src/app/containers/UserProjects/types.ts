import { Project, UserType } from 'types';

/* --- STATE --- */
export interface UserProjectsState {
  projects: Project[];
  loading: boolean;
  error?: null | string;
}

export interface FetchProjectPayload {
  userId: string;
  userType: UserType;
}

export type ContainerState = UserProjectsState;
