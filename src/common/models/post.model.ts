import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { Length } from "class-validator";
import { UserModel } from "./user.model";

@ObjectType()
export class PostModel {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => UserModel)
  author: UserModel
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