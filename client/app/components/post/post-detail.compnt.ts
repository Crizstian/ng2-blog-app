import {Component,ElementRef,
        Inject,Input}         from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';

import {Observable}           from 'rxjs/Observable';
import {Observer}             from 'rxjs/Observer';

import {AppState}             from '../../logic/AppState';
import {dispatcher,state}     from '../../logic/StateAndDispatcher';
import {Action,AddPostAction,
        DeletePostAction}     from '../../logic/Actions';

import {PostService}          from '../../services/PostService.service';
import {Logger}               from '../../services/Logger.service';
import {Post}                 from '../../models/Post';

@Component({
  template: `
  <div *ngIf="post">
    <div class="row medium-8 large-7 columns">
      <div class="blog-post">
        <h3>{{post.title}} <small>3/6/2015</small></h3>
        <img class="thumbnail" src="{{post.img}}">
        <p>{{post.content}}</p>
        <div class="callout">
          <ul class="menu simple">
            <li><a href="#">Author: Mike Mikers</a></li>
            <li><a href="#">Comments: 3</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div *ngIf="!post">
    <h3>Blog Post Not Found </h3>
  </div>
  <button (click)="gotoPosts()">Back</button>
  `,
})
export class PostDetailCompnt {

  post:Post;

  constructor(
              // @Inject(dispatcher) private dispatcher: Observer<Action>,
              // @Inject(state)      private state: Observable<AppState>,
              private _router: Router,
              private _routeParams:RouteParams,
              private _postService:PostService,
              private _logger:Logger,
              private _elementRef: ElementRef
            ) {}

  ngOnInit() {
    let id = this._routeParams.get('id');
    this._postService.get(id)
        .subscribe(
          data => this.post = data[0],
          err  => this._logger.log(err),
          ()   => this._logger.log('post with id fetched: '+id)
    );
  }
  gotoPosts() {
    this._router.navigate(['Articles']);
  }
}
