import { PostService } from '../services/postservice.service';
import { User } from './user';

export class Post {
  id: number;
  category: string;
  user: string;
  userObject: User;
  constructor(public description: string, public imageUrl: string) {}
}
