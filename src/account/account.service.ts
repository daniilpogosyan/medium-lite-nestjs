import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AccountService {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async signupUser(email: string, password: string) {
    let user: User;
    try {
      user = await this.userService.createUser(email, password);
    } catch(err) {
      if (err.code === 'P2002' && err?.meta?.target.includes('email')) {
        throw new HttpException('This email is in use', HttpStatus.BAD_REQUEST);
      }
    }
    const jwt = this.authService.issueJWT({ id: user.id });
    return jwt;
  }

  async loginUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    const passwordMatch = await this.authService.validate(
      password,
      user.passwordHash,
    );
    if (passwordMatch) {
      const jwt = this.authService.issueJWT({ id: user.id });
      return jwt;
    }

    throw new HttpException('Wrong email or password', HttpStatus.UNAUTHORIZED);
  }
}
