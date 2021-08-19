import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/postservice.service';
import { Post } from 'src/app/common/post';
import { PostCategory } from 'src/app/common/post-category';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: Post[] = [];
  category: PostCategory = null!;
  currentCategoryId: number = 1;
  
  constructor(private postService: PostService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleListPosts();
    });
}

  deletePost(id: number) {
    this.postService.deletePost(id).subscribe(data => console.log(`deleted post id: ${id}`));
  }

  listPosts() {
    this.postService.getPosts().subscribe(
      data => {
        this.posts = data;
      }
    );
  }

  handleListPosts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else {
      this.currentCategoryId = 1;
    }

    this.postService.getPostsByCategory(this.currentCategoryId).subscribe(
      data=> {
        this.posts = data;
      }
    );
  }
  
}