import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional } from 'class-validator';

@InputType()
export class OffsetPaginationInput {
  @Field(() => Int)
  @IsOptional()
  @IsInt()
  page?: number = 1;

  @Field(() => Int)
  @IsOptional()
  @IsInt()
  limit: number = 10;
}
