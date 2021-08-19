import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/common/post';
import { PostCategory } from 'src/app/common/post-category';
import { PostService } from 'src/app/services/postservice.service';

@Component({
  selector: 'app-post-input-box',
  templateUrl: './post-input-box.component.html',
  styleUrls: ['./post-input-box.component.css']
})
export class PostInputBoxComponent implements OnInit {
  constructor(private postService: PostService) { }

  postCategories: PostCategory[];
  postAuthor: string = "";
  postDescription: string = "";
  postImageUrl: string = "";
  postCategoryName: string = "";
  ngOnInit(): void {
    this.postService.getPostCategories().subscribe(
      data => { this.postCategories = data }
    );
  }

  onSubmit() {
    let post = new Post(this.postAuthor, this.postDescription, this.postImageUrl, true, this.postCategoryName)
    let categoryId = this.findCategoryId(this.postCategoryName);
    this.postService.addPost(post, categoryId).subscribe(data => console.log(post));
  }

  findCategoryId(categoryName: string) : number {
    for(let temp of this.postCategories) {
      if(temp.categoryName === categoryName) {
        return temp.id;
      }
    }
    return 0;
  }
}
