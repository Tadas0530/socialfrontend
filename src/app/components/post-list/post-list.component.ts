import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/postservice.service';
import { Post } from 'src/app/common/post';
import { PostCategory } from 'src/app/common/post-category';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: Post[] = [];
  category: PostCategory = null!;
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(
      data => {
        this.posts = data;
      }
    );
}
}