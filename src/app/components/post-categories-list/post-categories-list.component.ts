import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostCategory } from 'src/app/common/post-category';
import { SubscribedCategories } from 'src/app/common/subscribed-categories';
import { User } from 'src/app/common/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PostService } from 'src/app/services/postservice.service';
import { RelationService } from 'src/app/services/relation.service';

@Component({
  selector: 'app-post-categories-list',
  templateUrl: './post-categories-list.component.html',
  styleUrls: ['./post-categories-list.component.css']
})
export class PostCategoriesListComponent implements OnInit {

  constructor(private postService: PostService,
    private route: ActivatedRoute,
    private authentication: AuthenticationService,
    private relation: RelationService) { }

  postCategories: PostCategory[];
  userList: User[];
  currentUser: User = this.authentication.currentUser;
  userSubscriptions: SubscribedCategories[] = null!;

  ngOnInit(): void {
    this.postService.getPostCategories().subscribe(
      data => { this.postCategories = data }
    );

    this.getUserSubscriptions();

    this.postService.getAllUsers().subscribe(data =>
     { this.userList = data } )
  }

  category = new PostCategory("Fishing");

  submitCategory() {
    this.postService.addCategory(this.category).subscribe(data => console.log(this.category))
  }

  getUserSubscriptions() {
    console.log(this.currentUser.id)
    this.relation
      .getUserSubscriptions(this.currentUser.id)
      .subscribe(data => { 
        this.userSubscriptions = data;
      });
  }
}
