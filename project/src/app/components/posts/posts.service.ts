import { Post } from './posts.model';
import { Subject } from 'rxjs';
export class PostService {
  private posts: Post[] = [];
  private hostUpdated = new Subject<Post[]>();

  getPosts() {
    return [...this.posts];
  }
  getPostUpdateListener() {
    return this.hostUpdated.asObservable();
  }
  addPost(post: Post) {
    this.posts.push(post);
    this.hostUpdated.next([...this.posts]);
  }
}
