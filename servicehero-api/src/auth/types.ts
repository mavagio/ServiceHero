import { UserType } from '../user/types';

export class ValidatedUser {
  id: string;
  type: UserType;
}

export interface JwtPayload {
  name: string;
  sub: string;
  type: UserType;
  email: string;
}
