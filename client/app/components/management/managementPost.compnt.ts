import {Component,ElementRef,
        Inject,Input, OnInit} from 'angular2/core';
import {Router,RouterLink}    from 'angular2/router';
import {Observable}           from 'rxjs/Observable';
import {Observer}             from 'rxjs/Observer';
import {dispatcher,state}     from '../../logic/newStateDispatcher';
import {AppState}             from '../../logic/AppState';
import {Action,PostActions,stateAction}    from '../../logic/Actions';

import {PostService}         from '../../services/PostService.service';
import {Logger}              from '../../services/Logger.service';
import {Post}                from '../../models/Post';

declare var jQuery:any;
declare var foundation:any;

@Component({
  selector   : 'app-management-post',
  directives : [RouterLink],
  templateUrl: 'app/components/management/templates/managementPost.html'
})
export class ManagementPostCompnt{

  month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
           "Aug", "Sep", "Oct", "Nov", "Dec"];

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
        type: stateAction.REQUEST_DATA,
        json: data
      })),
      (err)  => this._dispatcher.next(new PostActions.Action({
        type: stateAction.RECEIVE_DATA,
        err: err
      })),
      ()     => this._dispatcher.next(new PostActions.Action({
        type: stateAction.RECEIVE_DATA
      }))
    );
  }

  get getPosts() {
    return this._state.map(s => s.post.items.map(item => {return item;}));
  }

  openPost(id:string){
    this._router.navigate( ['ManagementPostDetail', {id: id} ] );
  }

  deletePost(id:string){
    this._postService.delete(id).subscribe(
      (data) => {
        this._dispatcher.next(new PostActions.Action({
          type: stateAction.DELETE_DATA,
          id
        }));
      },
      (err)  => this._logger.log('Data NOT DELETED Correctly!'),
      ()     => this._logger.log('Data Deleted Correctly!'));
  }

}
