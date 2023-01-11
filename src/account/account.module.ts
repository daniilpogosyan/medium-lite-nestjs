import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { AccountController } from './account.controller';
import { AccountResolver } from './account.resolver';
import { AccountService } from './account.service';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [AccountController],
  providers: [AccountService, AccountResolver],
})
export class AccountModule {}
