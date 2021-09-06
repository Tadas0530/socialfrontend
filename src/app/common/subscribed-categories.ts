import { PostCategory } from './post-category';
import { User } from './user';

export class SubscribedCategories {
  constructor(public user: User, public postCategory: PostCategory) {}
}
