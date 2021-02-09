import { UserType } from '../types';
import { IsEmail, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(UserType)
  type: UserType;

  @IsNotEmpty()
  password: string;
}
