import { Component, OnInit } from '@angular/core';
import { PostCategory } from 'src/app/common/post-category';
import { PostService } from 'src/app/services/postservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SocialMedia';

  constructor(private postService: PostService) { }

  postCategories: PostCategory[];

  ngOnInit(): void {
    this.postService.getPostCategories().subscribe(
      data => { this.postCategories = data }
    );
  }
}
