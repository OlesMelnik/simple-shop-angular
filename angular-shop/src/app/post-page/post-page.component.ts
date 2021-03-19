import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PostService } from '../admin/shared/components/services/post.service';
import { Post } from '../shared/interfaces';
@Component({
 selector: 'app-post-page',
 templateUrl: './post-page.component.html',
 styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
 post$: Observable<Post>;
 constructor(
 private route: ActivatedRoute,
 private postsService: PostService
 ) { }
 ngOnInit(): void {
 this.post$ = this.route.params.
 pipe(switchMap((params: Params) => {
 return this.postsService.getById(params['id']);
 }));
 }
}
