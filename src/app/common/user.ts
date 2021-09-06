import { Post } from "./post";

export class User {
    id: number
    username: string;
    posts: Post[];
    profilePic: string;
}
