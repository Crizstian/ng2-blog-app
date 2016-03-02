import {Component,Input,Output,EventEmitter} from 'angular2/core';
import {RouteParams, RouterLink}  from 'angular2/router';

@Component({
  selector: 'manage-head',
  directives : [RouterLink],
  templateUrl: 'app/components/management/templates/management-header.html'
})
export class ManagementHeader{

  @Input() type;
  @Input() user;
  @Input() section;

  constructor(){}

}
