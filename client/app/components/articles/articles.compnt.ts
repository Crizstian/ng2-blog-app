import {Component,ElementRef,
        Inject,Input, OnInit}         from 'angular2/core';
import {Router}               from 'angular2/router';
import {Observable}           from 'rxjs/Observable';
import {Observer}             from 'rxjs/Observer';
import {dispatcher,state}     from '../../logic/newStateDispatcher';
import {AppState}             from '../../logic/AppState';
import {Action,PostActions,stateAction}    from '../../logic/Actions';

import {PostService}          from '../../services/PostService.service';
import {Logger}               from '../../services/Logger.service';
import {Post}                 from '../../models/Post';

declare var jQuery:any;
declare var foundation:any;

@Component({
  selector   : 'app-articles',
  templateUrl: 'app/components/articles/templates/articles.html'
})
export class ArticlesCompnt implements OnInit{

  constructor(
              private _router: Router,
              private _postService:PostService,
              private _logger:Logger,
              private _elementRef: ElementRef,
              @Inject(dispatcher) private _dispatcher: Observer<Action>,
              @Inject(state) private _state: Observable<AppState>
            ) {}

  ngOnInit() {
    jQuery(this._elementRef.nativeElement).foundation();

    this._postService.getAll().subscribe(
      (data) => this._dispatcher.next(new PostActions.Action({
        service: 'POST',
        type: stateAction.REQUEST_DATA,
        json: data
      })),
      (err)  => this._dispatcher.next(new PostActions.Action({
        type: stateAction.RECEIVE_DATA,
        err: err
      })),
      ()     => {
        this._dispatcher.next(new PostActions.Action({
        type: stateAction.RECEIVE_DATA
      }));
      this._state.subscribe(s => {
        console.log(s);
      });
    }
    );

  }

  get getPosts() {
    return this._state.map(s => s.post);
  }


  openPost(id:string){
    this._router.navigate( ['PostDetail', {id: id} ] );
  }

}
