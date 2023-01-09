import { posts } from '@prisma/client';

export type LeanPosts = Omit<posts, 'ID'>;
