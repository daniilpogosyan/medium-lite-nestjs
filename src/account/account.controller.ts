import { Controller, Post } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { AccountService } from "./account.service";

@Controller()
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly usersService: UsersService
  ) {}

  @Post('signup')
  signupUser() {
    return this.accountService.signupUser()
  }

  @Post('login')
  loginUser() {
    return this.accountService.loginUser()
  }
}