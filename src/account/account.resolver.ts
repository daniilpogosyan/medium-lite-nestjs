import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AccountService } from './account.service';

@Resolver()
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Mutation(() => String)
  async signup(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const jwt = await this.accountService.signupUser(email, password);
    return jwt;
  }

  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return this.accountService.loginUser(email, password);
  }
}
