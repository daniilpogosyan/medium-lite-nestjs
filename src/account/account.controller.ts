import { Controller, Post } from "@nestjs/common";


@Controller()
export class AccountController {
  @Post('signup')
  signupUser() {
    return 'Not implemented yet'
  }

  @Post('login')
  loginUser() {
    return 'Not implemented yet'
  }
}