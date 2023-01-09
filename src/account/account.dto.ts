import { IsStrongPassword, IsEmail } from 'class-validator';

class Credentials {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}

export class LoginUserInput extends Credentials {}

export class SignupUserInput extends Credentials {}
