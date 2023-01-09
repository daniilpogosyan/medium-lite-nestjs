import { IsInt, IsBoolean, IsPositive, IsOptional } from 'class-validator';

export class GetUsersOptions {
  @IsInt()
  @IsPositive()
  limit: number = 10;

  @IsInt()
  @IsPositive()
  page: number = 1;

  @IsOptional()
  @IsBoolean()
  includePosts: boolean = false;
}
