import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../posts.model';
import { PostService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  constructor(private postService: PostService) {}

  ngOnInit(): void {}
  saveNewPost(form: NgForm) {
    if (form.valid) {
      const post: Post = {
        title: form.value.title,
        content: form.value.content,
      };
      this.postService.addPost(post);
      console.log(this.postService.getPosts());
      form.resetForm();
    } else {
      return;
    }
  }
}
