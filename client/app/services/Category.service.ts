import {Http}       from 'angular2/http';
import {Injectable,Inject,Injector} from 'angular2/core';
import {Category} from '../models/Category';
import {Logger} from './Logger.service';

@Injectable()
export class CategoryService{

  categories:Category[] = [];

  private baseAPI: string = 'http://localhost:8000/api/v1/categories';

  constructor(
      private http: Http,
      private _logger:Logger
    ) {}

  getTest(){
    return this.http.get(this.baseAPI+'/test')
               .map(res => res.json());
  }

  getAll() {
  	return this.http.get(this.baseAPI)
                    .map(res => res.json());
  }

  save(category:Category){
    return this.http.post(this.baseAPI+'/add', JSON.stringify(category))
                    .map(res => res.json());
  }

  update(category:Category){
    return this.http.put(this.baseAPI+'/category/'+category.title, JSON.stringify(category))
                    .map(res => res.json());
  }

  get(id:string){
  	return this.http.get(this.baseAPI+'/category/'+id)
                    .map(res => res.json());
  }

  delete(id:string){
  	return this.http.delete(this.baseAPI+'/category/'+id)
                    .map(res => res.json());
  }

}
