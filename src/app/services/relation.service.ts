import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PostCategory } from '../common/post-category';
import { SubscribedCategories } from '../common/subscribed-categories';
import { User } from '../common/user';
import { AuthenticationService } from './authentication.service';
import { PostService } from './postservice.service';

@Injectable({
  providedIn: 'root',
})
export class RelationService {
  constructor(
    private httpClient: HttpClient,
    private postService: PostService,
    private authentication: AuthenticationService
  ) {}

  categoryUrl = 'http://localhost:8080/api/post-category';
  userUrl = 'http://localhost:8080/api/users';
  subscriptionSearchUrl =
    'http://localhost:8080/api/subscriptions';

  followACategory(user: User, category: PostCategory) : Observable<SubscribedCategories> {
    let subscription: SubscribedCategories = new SubscribedCategories(user, category);


   return this.httpClient.post<SubscribedCategories>(
      `http://localhost:8080/api/subscriptions`,
      { "user" : `http://localhost:8080/api/user/${user.id}`, "postCategory" : `http://localhost:8080/api/postCategory/${category.id}` }
    ).pipe(map( data => { return data }));
  }

  unfollowACategory() {

  }

  getUserSubscriptions(userId: number): Observable<SubscribedCategories[]> {
    return this.httpClient
      .get<GetResponseSearchSubscriptions>(`http://localhost:8080/api/subscriptions/search/findSubscribedCategoriesByUserId?userId=${userId}`)
      .pipe(map((response) => response._embedded.subscribedCategories));
  }
}

interface GetResponseSearchSubscriptions {
  _embedded: {
    subscribedCategories: SubscribedCategories[];
  };
}
