import {Component,ElementRef,
        Inject,Input, OnInit}         from 'angular2/core';
import {Router}               from 'angular2/router';
import {Observable}           from 'rxjs/Observable';
import {Observer}             from 'rxjs/Observer';
import {dispatcher,state}     from '../../logic/newStateDispatcher';
import {AppState}             from '../../logic/AppState';
import {Action,
        AddPostAction,
        DeletePostAction}    from '../../logic/Actions';
        
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

    this._postService.getAll()
        .subscribe((data) =>{
          data.forEach((item) =>
            this._dispatcher.next(new AddPostAction(item.title,item.content,item.img,new Date(item.created),item._id)
          ));
        },
        (err) => console.log(err),
        ()    => this._logger.log('Categories Data Fetched completed!'));
  }

  get getPosts() {
    return this._state.map(s => s.post.map(item => {return item;}));
  }


  openPost(id:string){
    this._router.navigate( ['PostDetail', {id: id} ] );
  }

}
