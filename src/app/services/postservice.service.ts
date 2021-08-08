import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../common/post';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PostCategory } from '../common/post-category';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) { }

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