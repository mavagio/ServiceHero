/* --- STATE --- */
import { User } from 'types';

export interface UserInfoState {
  user: User | null;
  loading: boolean;
  error: null | string;
}

export type ContainerState = UserInfoState;
