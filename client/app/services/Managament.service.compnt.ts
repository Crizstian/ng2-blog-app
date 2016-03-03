import {Http}              from 'angular2/http';
import {Injectable,Inject,
        Injector}          from 'angular2/core';
import {ManagementModel}   from '../models/management';
import {Logger}            from './Logger.service';
import {Observable}        from 'rxjs/Observable';

@Injectable()
export class ManagementService{

  private baseAPI: string = 'http://192.168.0.10:8000/api/v1/management';

  constructor(
      private http: Http,
      private _logger:Logger
    ) {}

  getAll():Observable<any> {
  	return this.http.get(this.baseAPI)
                    .map(res => res.json())
                    .share();
  }

  save(management:ManagementModel):Observable<any> {
    console.log(management);
    return this.http.post(`${this.baseAPI}/add`, JSON.stringify(management))
                    .map(res => res.json())
                    .share();
  }

  update(management:ManagementModel):Observable<any> {
    return this.http.put(`${this.baseAPI}/management/${management._id}`, JSON.stringify(management))
                    .map(res => res.json())
                    .share();
  }

  get(id:string):Observable<any> {
  	return this.http.get(`${this.baseAPI}/management/${id}`)
                    .map(res => res.json())
                    .share();
  }

  delete(id:string):Observable<any> {
  	return this.http.delete(`${this.baseAPI}/management/${id}`)
                    .map(res => res.json())
                    .share();
  }

}
