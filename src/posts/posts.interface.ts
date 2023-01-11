import { Post } from '@prisma/client';

export type LeanPosts = Omit<Post, 'id'>;
