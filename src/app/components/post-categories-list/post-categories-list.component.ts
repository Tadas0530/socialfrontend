import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostCategory } from 'src/app/common/post-category';
import { PostService } from 'src/app/services/postservice.service';

@Component({
  selector: 'app-post-categories-list',
  templateUrl: './post-categories-list.component.html',
  styleUrls: ['./post-categories-list.component.css']
})
export class PostCategoriesListComponent implements OnInit {

  constructor(private postService: PostService,
    private route: ActivatedRoute) { }

  postCategories: PostCategory[];

  ngOnInit(): void {
    this.postService.getPostCategories().subscribe(
      data => { this.postCategories = data }
    );
  }

  category = new PostCategory("Fishing");

  submitCategory() {
    this.postService.addCategory(this.category).subscribe(data => console.log(this.category))
  }
}
