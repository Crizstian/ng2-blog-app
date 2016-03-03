import {Component,ElementRef,
        Inject,Input, OnInit} from 'angular2/core';
import {Router}               from 'angular2/router';
import {Observable}           from 'rxjs/Observable';
import {Observer}             from 'rxjs/Observer';
import {AppState}             from '../../logic/AppState';
import {Logger}               from '../../services/Logger.service';
import {ManagementHeader}     from './management-header.compnt';
import {dispatcher,state}     from '../../logic/newStateDispatcher';
import {ManagementService}    from '../../services/Managament.service.compnt';
import {Action,ManagementActions,stateAction}    from '../../logic/Actions';

declare var jQuery:any;
declare var foundation:any;

@Component({
  selector   : 'app-management',
  directives : [ManagementHeader],
  templateUrl: 'app/components/management/templates/management.html'
})
export class ManagementCompnt implements OnInit{

  constructor(
              private _router: Router,
              private _managementService:ManagementService,
              private _logger:Logger,
              private _elementRef: ElementRef,
              @Inject(dispatcher) private _dispatcher: Observer<Action>,
              @Inject(state) private _state: Observable<AppState>
            ) {}

  ngOnInit() {
    jQuery(this._elementRef.nativeElement).foundation();

    this._managementService.getAll().subscribe(
      (data) => this._dispatcher.next(new ManagementActions.Action({
        type: stateAction.REQUEST_DATA,
        json: data
      })),
      (err)  => this._dispatcher.next(new ManagementActions.Action({
        type: stateAction.RECEIVE_DATA,
        err: err
      })),
      ()     => {
        this._dispatcher.next(new ManagementActions.Action({
        type: stateAction.RECEIVE_DATA
      }));
      this._state.subscribe(s => {
        console.log(s);
      });
    }
    );
  }

  get getManagements() {
    return this._state.map(s => s.management);
  }

  openSection(id:string){
    this._router.navigate( [id] );
  }

  deleteSection(id:string){
    this._managementService.delete(id).subscribe(
      (data) => {
        this._dispatcher.next(new ManagementActions.Action({
          type: stateAction.DELETE_DATA,
          id
        }));
      },
      (err)  => this._logger.log('Data NOT DELETED Correctly!'),
      ()     => this._logger.log('Data Deleted Correctly!'));
  }

}
