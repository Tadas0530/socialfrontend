import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Post } from '../common/post';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PostCategory } from '../common/post-category';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient,
    private route: ActivatedRoute) { }

  
  private baseUrl = "http://localhost:8080/api/posts";
  private categoryUrl = 'http://localhost:8080/api/post-category';

  getPosts(): Observable<Post[]> {
    return this.httpClient.get<GetResponsePosts>(this.baseUrl)
    .pipe(map((response) => response._embedded.post));
  }

  getPostCategories(): Observable<PostCategory[]> {
    return this.httpClient.get<GetResponseCategories>(this.categoryUrl)
    .pipe(map((response) => response._embedded.postCategory));
  }

  addPost(post: Post, categoryId: number): Observable<any> {
    post.category = `${this.categoryUrl}/${categoryId}`
    return this.httpClient.post<Post>(this.baseUrl, post);
  }

  addCategory(postCategory: PostCategory) : Observable<any> {
    return this.httpClient.post<PostCategory>(this.categoryUrl, postCategory)
  }

  deletePost(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete(url);
  }
  
  // http://localhost:8080/api/posts/search/findByCategoryId?id=2

  getPostsByCategory(theCategoryId: number) : Observable<Post[]> {
    const searchByCategoryUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
    return this.httpClient.get<GetResponsePosts>(searchByCategoryUrl).pipe(map((response) => response._embedded.post));
  }
}

interface GetResponsePosts {
  _embedded: {
    post: Post[];
  }

}

interface GetResponseCategories {
  _embedded: {
    postCategory: PostCategory[];
  }
}