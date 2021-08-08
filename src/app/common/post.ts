import { PostCategory } from "./post-category";

export class Post {
    id: number;
    author: string;
    description: string;
    imageUrl: string;
    active: boolean;
    dateCreated: Date;
    timeCreated: Date;
}
