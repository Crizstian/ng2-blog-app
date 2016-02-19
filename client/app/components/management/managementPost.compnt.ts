import {Component,ElementRef,
        Inject,Input, OnInit} from 'angular2/core';
import {Router,RouterLink}               from 'angular2/router';
import {Observable}           from 'rxjs/Observable';
import {Observer}             from 'rxjs/Observer';
import {AppState}             from '../../logic/AppState';
import {Action,AddPostAction,
        DeletePostAction}     from '../../logic/Actions';
import {Logger}               from '../../services/Logger.service';
import {PostService}          from '../../services/PostService.service';

declare var jQuery:any;
declare var foundation:any;

@Component({
  selector   : 'app-management-post',
  directives : [RouterLink],
  templateUrl: 'app/components/management/templates/managementPost.html'
})
export class ManagementPostCompnt implements OnInit{

  constructor(
              private _router: Router,
              private _postService:PostService,
              private _logger:Logger,
              private _elementRef: ElementRef
            ) {}

  ngOnInit() {
    jQuery(this._elementRef.nativeElement).foundation();
    this._postService.getAll()
        .subscribe(posts => this._postService.posts = posts,
                   err => this._logger.log(err),
                   () => this._logger.log('Data Retrieved From Server'));
  }

  get getPosts() {
    // return this.state.map(s => {return s.posts});
    return this._postService.posts;
  }

  openPost(id:string){
    let route = id.replace(/\s/g,'-');
    this._router.navigate( ['ManagementPostDetail', {id: route} ] );
  }

  deletePost(id:string){
    console.log('post deleted! '+id);
  }

}
