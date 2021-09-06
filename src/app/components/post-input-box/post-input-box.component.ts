import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/user';
import { PostCategory } from 'src/app/common/post-category';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PostService } from 'src/app/services/postservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/common/post';

@Component({
  selector: 'app-post-input-box',
  templateUrl: './post-input-box.component.html',
  styleUrls: ['./post-input-box.component.css'],
})
export class PostInputBoxComponent implements OnInit {
  constructor(
    private postService: PostService,
    private authentication: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  postCategories: PostCategory[];
  postDescription: string = '';
  postImageUrl: string = '';
  routerUrl = this.router.url;
  currentUser: User = this.authentication.currentUser;
  userString : string = null!;
  currentPathId: number = null!;
  postingToCategory: string = 'none';

  ngOnInit(): void {
    this.postService.getPostCategories().subscribe((data) => {
      this.postCategories = data;
      this.getCategory();
    });
    this.currentPathId = +this.activatedRoute.firstChild?.snapshot.paramMap.get('id')!;
  }


  onSubmit() {
    console.log(this.currentPathId + "<------------- current category id")
    let userId = this.currentUser.id;
    console.log(this.postDescription)
    this.postService.addPost(new Post(this.postDescription, this.postImageUrl), this.currentPathId, userId).subscribe(data => console.log("Posting" + data));
  }

  resetValues() {
    this.onSubmit();
    this.postDescription = "";
    this.postImageUrl = "";
  }

  getCategory() {
    this.postService.getASingleCategory(this.currentPathId).subscribe((data) => { this.postingToCategory = data.categoryName });
  }
}
