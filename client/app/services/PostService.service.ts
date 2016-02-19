import {Http}       from 'angular2/http';
import {Injectable,Inject,Injector} from 'angular2/core';
import {Post} from '../models/Post';
import {Action,AddPostAction} from '../logic/Actions';
import {Observer} from 'rxjs/Observer';
import {dispatcher} from '../logic/StateAndDispatcher';
import {Logger} from './Logger.service';
import 'rxjs/Rx';

@Injectable()
export class PostService{

  posts:Post[];

  private baseAPI: string = 'http://localhost:8000/api/v1/post';

  constructor(
      // @Inject(dispatcher)
      // private dispatcher: Observer<Action>,
      private http: Http,
      private _logger:Logger
    ) {
      // this.dispatcher: Observer<Action> = this._injector.get(dispatcher);
      // console.log(this._injector.getOptional(state));
    }

  getAll() {
  	return this.http.get(this.baseAPI+'s')
                    .map(res => { return res.json(); });
  }

  save(post){
    return this.http.post(this.baseAPI, JSON.stringify(post))
                    .map(res => { return res.json(); });
  }

  update(post){
    return this.http.put(this.baseAPI+'/'+post._id, JSON.stringify(post))
                    .map(res => { return res.json(); });
  }

  get(id){
  	return this.http.get(this.baseAPI+'/'+id)
                    .map(res => { return res.json(); });
  }

  delete(id){
  	return this.http.delete(this.baseAPI+'/'+id)
                    .map(res => { return res.json(); });
  }

}
