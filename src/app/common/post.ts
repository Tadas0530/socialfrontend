
export class Post {
  id: number;

  constructor(
    public author: string,
    public description: string,
    public imageUrl: string,
    public active: boolean,
    public category: string
  ) {}
}
