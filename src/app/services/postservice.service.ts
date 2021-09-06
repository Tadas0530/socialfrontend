import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaderResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Post } from '../common/post';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PostCategory } from '../common/post-category';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ObserveOnSubscriber } from 'rxjs/internal/operators/observeOn';
import { User } from '../common/user';
import {
  AuthenticationBean,
  AuthenticationService,
} from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private authentication: AuthenticationService
  ) {}

  private baseUrl = 'http://localhost:8080/api/posts';
  private categoryUrl = 'http://localhost:8080/api/post-category';
  private usersUrl = 'http://localhost:8080/api/users';
  private searchCategoryUrl =
    'http://localhost:8080/api/post-category/search/findByCategoryNameContaining?name=';
  currentUser = this.authentication.currentUser;

  // --------------------------------------------------- POSTS METHODS ---------------------------------------------------

  getPosts(): Observable<Post[]> {
    return this.httpClient
      .get<GetResponsePosts>(this.baseUrl)
      .pipe(map((response) => response._embedded.post));
  }

  addPost(post: Post, categoryId: number, userId: number): Observable<Post> {
    post.category = `${this.categoryUrl}/${categoryId}`;
    post.user = `${this.usersUrl}/${userId}`;
    console.log(JSON.stringify(post))
    return this.httpClient.post<Post>(this.baseUrl, post);
  }

  deletePost(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete(url);
  }

  // --------------------------------------------------- CATEGORIES METHODS ---------------------------------------------------

  getPostCategories(): Observable<PostCategory[]> {
    return this.httpClient
      .get<GetResponseCategories>(this.categoryUrl)
      .pipe(map((response) => response._embedded.postCategory));
  }

  addCategory(postCategory: PostCategory): Observable<any> {
    return this.httpClient.post<PostCategory>(this.categoryUrl, postCategory);
  }

  getPostsByCategory(theCategoryId: number): Observable<Post[]> {
    const searchByCategoryUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.httpClient
      .get<GetResponsePosts>(searchByCategoryUrl)
      .pipe(map((response) => response._embedded.post));
  }

  getASingleCategory(categoryId: number): Observable<PostCategory> {
    return this.httpClient.get<PostCategory>(
      `${this.categoryUrl}/${categoryId}`
    );
  }

  searchCategories(keyword: string): Observable<PostCategory[]> {
    return this.httpClient
      .get<GetResponseCategories>(`${this.searchCategoryUrl}${keyword}`)
      .pipe(map((response) => response._embedded.postCategory));
  }

  // --------------------------------------------------- USER METHODS ---------------------------------------------------

  getAllUsers(): Observable<User[]> {
    return this.httpClient
      .get<GetResponseUsers>(this.usersUrl)
      .pipe(map((response) => response._embedded.user));
  }

  getUser(postId: number): Observable<User> {
    return this.httpClient.get<User>(
      `http://localhost:8080/api/posts/${postId}/user`
    );
  }
}

// --------------------------------------------------- INTERFACES ---------------------------------------------------

interface GetResponsePosts {
  _embedded: {
    post: Post[];
  };
}

interface GetResponseCategories {
  _embedded: {
    postCategory: PostCategory[];
  };
}

interface GetResponseUsers {
  _embedded: {
    user: User[];
  };
}
