import {Component,ElementRef,
        Inject,Input, OnInit} from 'angular2/core';
import {Router,RouterLink}    from 'angular2/router';
import {Observable}           from 'rxjs/Observable';
import {PostService}      from '../../services/PostService.service';
import {Logger}               from '../../services/Logger.service';
import {Post}             from '../../models/Post';

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
    return this._postService.posts;
  }

  openPost(id:string){
    this._router.navigate( ['ManagementPostDetail', {id: id} ] );
  }

  deletePost(id:string){
    this._postService.delete(id)
        .subscribe(
          data => this._logger.log(data.post),
          err => this._logger.log('an error ocurred deleting '+id)
        );
  }

}
