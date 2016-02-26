import {Component,ElementRef,
        Inject,Input}         from 'angular2/core';
import {RouteParams, Router}  from 'angular2/router';
import {Observable}           from 'rxjs/Observable';
import {Observer}             from 'rxjs/Observer';
import {dispatcher,state}     from '../../logic/newStateDispatcher';
import {AppState}             from '../../logic/AppState';
import {Action}               from '../../logic/Actions';

import {PostService}          from '../../services/PostService.service';
import {Logger}               from '../../services/Logger.service';
import {Post}                 from '../../models/Post';

declare var jQuery:any;
declare var foundation:any;

@Component({
  selector    : 'post-detail',
  templateUrl : 'app/components/post/templates/post-detail.html'
})
export class PostDetailCompnt {

  post:Post;
  id:string;

  constructor(
              private _router: Router,
              private _routeParams:RouteParams,
              private _postService:PostService,
              private _logger:Logger,
              private _elementRef: ElementRef,
              @Inject(dispatcher) private _dispatcher: Observer<Action>,
              @Inject(state) private _state: Observable<AppState>
            ) {}

            ngOnInit() {
              jQuery(this._elementRef.nativeElement).foundation();

               this.id = this._routeParams.get('id');
              if(this.id != '0'){
                this._postService.get(this.id)
                    .subscribe(
                      data => this.post = new Post(data[0].title,data[0].content,data[0].img,new Date(data[0].created),data[0]._id),
                      err  => this._logger.log(err),
                      ()   => {
                        this._logger.log('post with id fetched: '+this.post._id);
                      });
              }
            }
  gotoPosts() {
    this._router.navigate(['Articles']);
  }
}
