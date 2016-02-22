import {Http}              from 'angular2/http';
import {Injectable,Inject,
        Injector}          from 'angular2/core';
import {Post}          from '../models/Post';
import {Logger}            from './Logger.service';
import {Observable}        from 'rxjs/Observable';

@Injectable()
export class PostService{

  posts:Post[] = [];

  private baseAPI: string = 'http://192.168.0.10:8000/api/v1/posts';

  constructor(
      private http: Http,
      private _logger:Logger
    ) {}

  getAll():Observable<any> {
  	return this.http.get(this.baseAPI)
                    .map(res => res.json());
  }

  save(post:Post):Observable<any> {
    return this.http.post(`${this.baseAPI}/add`, JSON.stringify(post))
                    .map(res => res.json());
  }

  update(post:Post):Observable<any> {
    return this.http.put(`${this.baseAPI}/post/${post._id}`, JSON.stringify(post))
                    .map(res => res.json());
  }

  get(id:string):Observable<any> {
  	return this.http.get(`${this.baseAPI}/post/${id}`)
                    .map(res => res.json());
  }

  delete(id:string):Observable<any> {
  	return this.http.delete(`${this.baseAPI}/post/${id}`)
                    .map(res => res.json());
  }

}
