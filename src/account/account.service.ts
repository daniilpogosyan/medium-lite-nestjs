import { Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class AccountService {
  constructor(private readonly authService: AuthService) {}

  signupUser() {
    return 'AccountService.signupUser not implemented yet'
  }

  loginUser() {
    return 'AccountService.loginUser not implemented yet'
  }
}