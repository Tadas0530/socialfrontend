import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/postservice.service';
import { Post } from 'src/app/common/post';
import { PostCategory } from 'src/app/common/post-category';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RelationService } from 'src/app/services/relation.service';
import { SubscribedCategories } from 'src/app/common/subscribed-categories';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private authentication: AuthenticationService,
    private relation: RelationService
  ) {
  }

  posts: Post[] = [];
  currentCategory: PostCategory = null!;
  currentCategoryId: number = 1;
  postAuthor: User = null!;
  buttonText: string = 'Follow';
  isFollowed : boolean = false;
  userSubscriptions: SubscribedCategories[] = null!;
  currentUser: User = this.authentication.currentUser;
  link = this.router.url;


  ngOnInit(): void {
    this.getUserSubscriptions();
    this.getCategory();
    this.route.paramMap.subscribe(() => {
      this.handleListPosts();
    });
  }

  followState() {
    let hasCategoryId = this.route.snapshot.paramMap.has('id');
    let categoryId = +this.route.snapshot.paramMap.get('id')!;

    for (let category of Object.keys(this.userSubscriptions)) {
      let categoryItem = this.userSubscriptions[category];
      if (categoryId === categoryItem.postCategory.id) {
        this.buttonText = 'Followed';
        this.isFollowed = true;
        break;
      } else {
        this.isFollowed = false;
      }
    }
  }

  initializeUserObjects() {
    for(let post of this.posts) {
      this.postService.getUser(post.id).subscribe(data => { post.userObject = data })
    }
  }

  follow() {
    console.log(JSON.stringify(this.currentUser) + "--------------" +  JSON.stringify(this.currentCategory))
    window.location.reload();
    this.relation.followACategory(this.currentUser, this.currentCategory).subscribe(data => { console.log(data)});
  }

  deletePost(id: number) {
    this.postService
      .deletePost(id)
      .subscribe((data) => console.log(`deleted post id: ${id}`));
  }

  listPosts() {
    this.postService.getPosts().subscribe((data) => {
      this.posts = data;
      this.initializeUserObjects();
    });
  }

  getUserSubscriptions() {
    this.relation
      .getUserSubscriptions(this.currentUser.id)
      .subscribe((data) => {
        this.userSubscriptions = data;
        console.log("User subscriptions _________________" + JSON.stringify(this.userSubscriptions));
      });
  }

  getCategory() {
    this.postService.getASingleCategory(+this.route.snapshot.paramMap.get('id')!).subscribe(data => { this.currentCategory = data })
  }

  handleListPosts() {
    console.log(this.link);
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      this.currentCategoryId = 1;
    }

    if (this.link === '/posts') {
      this.listPosts();

    }

    this.postService
      .getPostsByCategory(this.currentCategoryId)
      .subscribe((data) => {
        this.followState();
        this.posts = data;
        this.initializeUserObjects();

      });
  }
}
