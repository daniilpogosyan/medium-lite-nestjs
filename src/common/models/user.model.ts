import { Field, Int, ObjectType } from "@nestjs/graphql";
import { PostModel } from "./post.model";

@ObjectType()
export class UserModel {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  email: string;

  @Field(() => [PostModel])
  posts: PostModel[]
}
