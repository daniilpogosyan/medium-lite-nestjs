import { Field, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsPositive,
  Length,
} from 'class-validator';

export class CreatePostInput {
  @Length(10, 100)
  title: string;

  @Length(100, 5000)
  content: string;
}

export class GetPostsOptions {
  @IsOptional()
  @IsInt()
  @IsPositive()
  userId?: number;

  @IsInt()
  @IsPositive()
  limit?: number = 10;

  @IsInt()
  @IsPositive()
  page?: number = 1;

  @IsOptional()
  @IsBoolean()
  includeContent?: boolean = false;
}

@InputType()
export class PostInput {
  @Field(() => String)
  @Length(10, 100)
  title: string;

  @Field(() => String)
  @Length(100, 5000)
  content: string;
}
