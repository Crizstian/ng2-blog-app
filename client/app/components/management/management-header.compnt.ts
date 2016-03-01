import {Component,Input,Output,EventEmitter} from 'angular2/core';
import {RouteParams, Router}  from 'angular2/router';

@Component({
  selector: 'manage-head',
  templateUrl: 'app/components/management/templates/management-header.html'
})
export class ManagementHeader{

  @Input() type;
  @Input() user;
  @Input() section;

  constructor(private _router: Router){}

  redirectLocation(route:string, id:string = '0'){
    console.log(route);
    this._router.navigate([route, {id: id}]);
  }

}
