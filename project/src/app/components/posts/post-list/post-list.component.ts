import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../posts.model';
import { PostService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.posts = this.postService.getPosts();
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts) => {
        this.posts = posts;
      });
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
