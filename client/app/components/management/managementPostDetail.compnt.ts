import {Component,ElementRef,
        Inject,Input}         from 'angular2/core';
import {RouteParams, Router,
        RouterLink}           from 'angular2/router';
import {FormBuilder,FORM_DIRECTIVES,
        ControlGroup,Control,
        Validators}           from 'angular2/common';
import {PostService}          from '../../services/PostService.service';
import {Logger}               from '../../services/Logger.service';
import {Post}                 from '../../models/Post';

import {Observable}           from 'rxjs/Observable';
import {Observer}             from 'rxjs/Observer';
import {dispatcher,state}     from '../../logic/newStateDispatcher';
import {AppState}             from '../../logic/AppState';
import {Action,
        AddPostAction,
        UpdatePostAction}     from '../../logic/Actions';

declare var jQuery:any;
declare var foundation:any;
declare var Quill:any;
declare var basicEditor:any;

@Component({
  selector    : 'management-post-detail',
  directives  : [RouterLink],
  templateUrl : 'app/components/management/templates/managementPostDetail.html'
})
export class ManagementPostDetailCompnt {

  post:Post;
  id:string;
  group: ControlGroup;
  private fullEditor:any;

  constructor(
              builder: FormBuilder,
              private _router: Router,
              private _routeParams:RouteParams,
              private _postService:PostService,
              private _logger:Logger,
              private _elementRef: ElementRef,
              @Inject(dispatcher) private _dispatcher: Observer<Action>,
              @Inject(state) private _state: Observable<AppState>
            ) {
              this.post = new Post('','');
              this.post.img = '';
              this.group = builder.group({
                title: ['',
                  Validators.compose([Validators.required, Validators.minLength(2)])
                ],
                content: ['',
                  Validators.compose([Validators.required, Validators.minLength(4)])
                ]
              });
            }

  ngOnInit() {
    jQuery(this._elementRef.nativeElement).foundation();
    const container = jQuery('#full-editor').get(0);
    const toolbars = jQuery('#full-toolbar').get(0);
    this.fullEditor = new Quill(container, {
        modules: {
          'toolbar': { container: toolbars }
        },
        theme: 'snow'
      });

     this.id = this._routeParams.get('id');
    if(this.id != '0'){
      this._postService.get(this.id)
          .subscribe(
            data => this.post = new Post(data[0].title,data[0].content,data[0].img,new Date(data[0].created),data[0]._id),
            err  => this._logger.log(err),
            ()   => {
              this._logger.log('post with id fetched: '+this.post._id);
              this.fullEditor.setHTML(`
                <textarea rows="4" id="content">${this.post.content}</textarea>`);
            });
    }
  }

  submitForm(){
    this.post.content = this.fullEditor.getText();
    this._postService.save(this.post)
        .subscribe(
          (item) => this._dispatcher.next(new UpdatePostAction(
                      new Post(item.title,item.content,item.img,item.created,item._id)
                    )),
          err => this._logger.log('an error ocurred on adding' + JSON.stringify(err)),
          () => {
            this._logger.log('post added!');
            this._router.navigate( ['ManagementPost'] );
          }
        );
  }

  updateForm(){
    this.post.content = this.fullEditor.getText();
    this._postService.update(this.post)
        .subscribe(
          (item) => this._dispatcher.next(new UpdatePostAction(
                      new Post(item.title,item.content,item.img,item.created,item._id)
                    )),
          err => this._logger.log('an error ocurred on adding' + JSON.stringify(err)),
          () => {
            this._logger.log('post updated!');
            this._router.navigate( ['ManagementPost'] );
          }
        );
  }

}
