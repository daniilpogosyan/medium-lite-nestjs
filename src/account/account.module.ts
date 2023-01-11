import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { AccountController } from './account.controller';
import { AccountResolver } from './account.resolver';
import { AccountService } from './account.service';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [AccountController],
  providers: [AccountService, AccountResolver],
})
export class AccountModule {}
