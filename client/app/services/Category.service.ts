import {Http}              from 'angular2/http';
import {Injectable,Inject,
        Injector}          from 'angular2/core';
import {Category}          from '../models/Category';
import {Logger}            from './Logger.service';
import {Observable}        from 'rxjs/Observable';

@Injectable()
export class CategoryService{

  categories:Category[] = [];

  private baseAPI: string = 'http://192.168.0.10:8000/api/v1/categories';

  constructor(
      private http: Http,
      private _logger:Logger
    ) {}

  getAll():Observable<any> {
  	return this.http.get(this.baseAPI)
                    .map(res => res.json());
  }

  save(category:Category):Observable<any> {
    return this.http.post(`${this.baseAPI}/add`, JSON.stringify(category))
                    .map(res => res.json());
  }

  update(category:Category):Observable<any> {
    return this.http.put(`${this.baseAPI}/category/${category._id}`, JSON.stringify(category))
                    .map(res => res.json());
  }

  get(id:string):Observable<any> {
  	return this.http.get(`${this.baseAPI}/category/${id}`)
                    .map(res => res.json());
  }

  delete(id:string):Observable<any> {
  	return this.http.delete(`${this.baseAPI}/category/${id}`)
                    .map(res => res.json());
  }

}
