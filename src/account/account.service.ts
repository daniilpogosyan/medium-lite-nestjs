import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AccountService {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  async signupUser(email: string, password: string) {
    const user = await this.userService.createUser(email, password);
    const jwt = this.authService.issueJWT({ ID: user.ID });
    return jwt;
  }

  async loginUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    const passwordMatch = await this.authService.validate(
      password,
      user.passwordHash,
    );
    if (passwordMatch) {
      const jwt = this.authService.issueJWT({ ID: user.ID });
      return jwt;
    }

    throw new HttpException('Wrong email or password', HttpStatus.UNAUTHORIZED);
  }
}
