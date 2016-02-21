import {Component,ElementRef,
        Inject,Input}         from 'angular2/core';
import {RouteParams, Router,RouterLink}  from 'angular2/router';
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
declare var Quill:any;
declare var basicEditor:any;

@Component({
  selector    : 'management-post-detail',
  directives  : [RouterLink],
  templateUrl : 'app/components/management/templates/managementPostDetail.html'
})
export class ManagementPostDetailCompnt {

  private fullEditor:any;
  post:Post;

  constructor(
              private _router: Router,
              private _routeParams:RouteParams,
              private _postService:PostService,
              private _logger:Logger,
              private _elementRef: ElementRef
            ) {}

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

    let id:string = this._routeParams.get('id');
    if(id !== '0'){
      this._postService.get(id)
          .subscribe(
            data => this.post = data[0],
            err  => this._logger.log(err),
            ()   => this._logger.log('post with id fetched: '+id));
    }
  }

  submitForm(){
    console.log(JSON.stringify(this.fullEditor.getHTML()));
  }

}
