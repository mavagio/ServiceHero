import { UserType } from 'types';

export interface UserDto {
  name: string;
  email: string;
  password: string;
  type: UserType;
}

export interface SignupPageState {
  isSuccess: boolean;
  loading: boolean;
  error?: string | null;
}

export type ContainerState = SignupPageState;
