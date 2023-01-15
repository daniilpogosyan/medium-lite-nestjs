import { Post } from '@prisma/client';
import DataLoader from 'dataloader';

export interface Dataloaders {
  postDataLoader: DataLoader<number, Post>;
  userDataLoader: DataLoader<number, User>;
}
