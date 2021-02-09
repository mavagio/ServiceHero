export enum UserType {
  Client = 'Client',
  Specialist = 'Specialist',
}

export interface UserPayload {
  name: string;
  type: UserType;
}
