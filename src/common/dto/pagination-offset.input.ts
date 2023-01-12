import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class OffsetPaginationInput {
  @Field(() => Int, { defaultValue: 1 })
  @IsInt()
  page: number;

  @Field(() => Int, { defaultValue: 10 })
  @IsInt()
  limit: number;
}
