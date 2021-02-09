import { JwtPayload } from 'types';

export interface AuthenticationState {
  accessToken: string | null;
  user: null | JwtPayload;
  loading: boolean;
  error?: null | string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export type ContainerState = AuthenticationState;
