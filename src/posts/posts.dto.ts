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
