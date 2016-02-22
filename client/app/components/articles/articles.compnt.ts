import {Component,ElementRef,
        Inject,Input, OnInit}         from 'angular2/core';
import {Router}               from 'angular2/router';
import {Observable}           from 'rxjs/Observable';
import {Observer}             from 'rxjs/Observer';
import {AppState}             from '../../logic/AppState';
import {Action,AddPostAction,
        DeletePostAction}     from '../../logic/Actions';
import {PostService}          from '../../services/PostService.service';
import {Logger}               from '../../services/Logger.service';
import {state}                from '../../logic/stateAndDispatcher';
import {Post}                 from '../../models/Post';

declare var jQuery:any;
declare var foundation:any;

@Component({
  selector   : 'app-articles',
  templateUrl: 'app/components/articles/templates/articles.html'
})
export class ArticlesCompnt implements OnInit{

  constructor(
              // @Inject(state) private state: Observable<AppState>,
              private _router: Router,
              private _postService:PostService,
              private _logger:Logger,
              private _elementRef: ElementRef
            ) {}

  ngOnInit() {
    jQuery(this._elementRef.nativeElement).foundation();
    this._postService.getAll()
        .subscribe((data) => {
          data.forEach((item) => {
            let post = new Post(item.title,item.content);
            post.img  = item.img;
            post.date = new Date(item.created);
            post._id  = item._id;
            this._postService.posts =
              [...this._postService.posts, post ];
          })
        },
        err => this._logger.log(err),
        () => this._logger.log('data fetched'));
  }

  get getPosts() {
    // return this.state.map(s => {return s.posts});
    return this._postService.posts;
  }

  openPost(id:string){
    this._router.navigate( ['PostDetail', {id: id} ] );
  }

}
