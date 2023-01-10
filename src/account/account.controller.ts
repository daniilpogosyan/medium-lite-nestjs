import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { LoginUserInput, SignupUserInput } from './account.dto';

@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('signup')
  async signupUser(@Body() createUserDto: SignupUserInput) {
    try {
      const jwt = await this.accountService.signupUser(
        createUserDto.email,
        createUserDto.password,
      );
      return jwt
    } catch(err) {
      if (err.code === 'P2002' && err?.meta?.target.includes('email')) {
        throw new HttpException('This email is in use', HttpStatus.BAD_REQUEST)
      }
    }
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserInput) {
    return this.accountService.loginUser(
      loginUserDto.email,
      loginUserDto.password,
    );
  }
}
