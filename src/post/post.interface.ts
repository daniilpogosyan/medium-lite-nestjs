import { Post } from '@prisma/client';

export type LeanPost = Omit<Post, 'id'>;
