import {Component,ElementRef,
        Inject,Input}         from 'angular2/core';
import {RouteParams, Router}  from 'angular2/router';
import {FormBuilder,
        FORM_DIRECTIVES,
        ControlGroup,Control,
        Validators}           from 'angular2/common';
import {ManagementService}    from '../../services/Managament.service.compnt';
import {Logger}               from '../../services/Logger.service';
import {ManagementModel}      from '../../models/management';

import {Observable}           from 'rxjs/Observable';
import {Observer}             from 'rxjs/Observer';
import {dispatcher,state}     from '../../logic/newStateDispatcher';
import {AppState}             from '../../logic/AppState';
import {Action}               from '../../logic/Actions';
import {ManagementHeader}     from './management-header.compnt';

declare var jQuery:any;
declare var foundation:any;

@Component({
  selector : 'add-management',
  directives  : [ManagementHeader,FORM_DIRECTIVES],
  templateUrl : 'app/components/management/templates/managament-form-add.html'
})
export class ManagementAddCompnt {
  id:string;
  group: ControlGroup;
  management:ManagementModel;

  constructor(
    builder: FormBuilder,
    private _router: Router,
    private _routeParams:RouteParams,
    private _managementService:ManagementService,
    private _logger:Logger,
    private _elementRef: ElementRef,
    @Inject(dispatcher) private _dispatcher: Observer<Action>,
    @Inject(state) private _state: Observable<AppState>
  ) {

    this.management = new ManagementModel('','');

    this.group = builder.group({
      title: ['',
        Validators.compose([Validators.required, Validators.minLength(2)])
      ],
      link: ['',
        Validators.compose([Validators.required, Validators.minLength(4)])
      ]
    });
  }

  ngOnInit() {
    jQuery(this._elementRef.nativeElement).foundation();
    this.id = this._routeParams.get('id');
    console.log(this.id);
  }

  submitForm(){
    console.log(this.management);
    this._managementService.save(this.management).subscribe(
      (data) => {},
      (err)  => {
        this._logger.log('Data NOT SAVED Correctly!');
      },
      ()     => {
        this._logger.log('Data Saved Correctly!');
        this._router.navigate( ['/ManagementContainer'] );
      });
  }

  updateForm(){
    this._managementService.update(this.management).subscribe(
      (data) => {},
      (err)  => {
        this._logger.log('Data NOT UPDATED Correctly!');
      },
      ()     => {
        this._logger.log('Data Updated Correctly!');
        this._router.navigate( ['/ManagementContainer'] );
      });
  }

}
