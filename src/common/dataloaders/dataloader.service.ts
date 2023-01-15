import { Injectable } from '@nestjs/common';
import { PostLoaderService } from './loaders/post-loader.service';
import { UserLoaderService } from './loaders/user-loader.service';

@Injectable()
export class DataLoaderService {
  constructor(
    private userLoaderService: UserLoaderService,
    private postLoaderService: PostLoaderService,
  ) {}

  getLoaders() {
    return {
      userDataLoader: this.userLoaderService.createUserLoader(),
      postDataLoader: this.postLoaderService.createPostLoader(),
    };
  }
}
