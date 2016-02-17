import {Component,ElementRef,
        Inject,Input}         from 'angular2/core';
import {Router}               from 'angular2/router';

import {Observable}           from 'rxjs/Observable';
import {Observer}             from 'rxjs/Observer';

import {AppState}             from '../../logic/AppState';
import {dispatcher,state}     from '../../logic/StateAndDispatcher';
import {Action,AddPostAction,
        DeletePostAction}     from '../../logic/Actions';

import {PostService}          from '../../services/PostService.service';
import {Logger}               from '../../services/Logger.service';

declare var jQuery:any;
declare var foundation:any;

@Component({
  selector   : 'app-articles',
  templateUrl: 'app/components/articles/templates/articles.html'
})
export class ArticlesCompnt{

  constructor(
              // @Inject(dispatcher) private dispatcher: Observer<Action>,
              // @Inject(state)      private state: Observable<AppState>,
              private _router: Router,
              private _postService:PostService,
              private _logger:Logger,
              private _elementRef: ElementRef
            ) {
              console.log(this._postService);
            }

  ngOnInit() {
    jQuery(this._elementRef.nativeElement).foundation();
    // this._postService.getAll();
  }

  get getPosts() {
    // return this.state.map(s => {return s.posts});
    return [];
  }

  openPost(id){
    this._router.navigate( ['PostDetail', { id: id }] );
  }

}
