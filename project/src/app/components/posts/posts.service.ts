import { Post } from './posts.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private hostUpdated = new Subject<Post[]>();

  constructor(private httpClient: HttpClient) {}

  getPosts() {
    // return [...this.posts];
    this.httpClient
      .get<{ message: string; posts: any }>('http://localhost:3000/api/posts')
      .pipe(
        map((postData) => {
          return postData.posts.map((el) => {
            return {
              title: el.title,
              content: el.content,
              id: el._id,
            };
          });
        })
      )
      .subscribe((postsGet) => {
        this.posts = postsGet;
        this.hostUpdated.next([...this.posts]);
      });
  }
  getPostUpdateListener() {
    return this.hostUpdated.asObservable();
  }
  addPost(post: Post) {
    this.posts.push(post);
    this.httpClient
      .post<{ message: string; postId: string }>(
        'http://localhost:3000/api/posts',
        post
      )
      .subscribe((responseData) => {
        console.log(responseData);
        const postId = responseData.postId;
        post.id = postId;
        this.hostUpdated.next([...this.posts]);
      });
  }

  deletePost(id) {
    this.httpClient
      .delete(`http://localhost:3000/api/posts/${id}`)
      .subscribe((response) => {
        let updatedPosts = this.posts.filter((post) => post.id !== id);
        this.posts = updatedPosts;
        this.hostUpdated.next([...this.posts]);
      });
  }
}
