import { Body, Controller, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { LoginUserInput, SignupUserInput } from './account.dto';

@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('signup')
  signupUser(@Body() createUserDto: SignupUserInput) {
    return this.accountService.signupUser(
      createUserDto.email,
      createUserDto.password,
    );
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserInput) {
    return this.accountService.loginUser(
      loginUserDto.email,
      loginUserDto.password,
    );
  }
}
