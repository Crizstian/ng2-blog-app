import {Component,ElementRef,
        Inject,Input}         from 'angular2/core';
import {RouteParams, Router}  from 'angular2/router';
import {Observable}           from 'rxjs/Observable';
import {Observer}             from 'rxjs/Observer';
import {AppState}             from '../../logic/AppState';
import {dispatcher,state}     from '../../logic/StateAndDispatcher';
import {Action,AddPostAction,
        DeletePostAction}     from '../../logic/Actions';
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
    jQuery(this._elementRef.nativeElement).foundation();
    let id = this._routeParams.get('id');
    this._postService.get(id)
        .subscribe(
          data => this.post = new Post(data[0].title,data[0].content,data[0].img,new Date(data[0].date),data[0]._id),
          err  => this._logger.log(err),
          ()   => {
            this._logger.log('post with id fetched: '+id);
          }
    );
  }
  gotoPosts() {
    this._router.navigate(['Articles']);
  }
}
