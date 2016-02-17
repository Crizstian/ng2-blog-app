import {Component,ElementRef,
        Inject,Input}         from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';

import {Observable}           from 'rxjs/Observable';
import {Observer}             from 'rxjs/Observer';

import {AppState}             from '../../logic/AppState';
import {dispatcher,state}     from '../../logic/StateAndDispatcher';
import {Action,AddPostAction,
        DeletePostAction}     from '../../logic/Actions';

import {PostService}          from '../../services/PostService.service';
import {Logger}               from '../../services/Logger.service';

@Component({
  template: `
  <h2>HEROES</h2>
  <div *ngIf="hero">
    <h3>"{{hero.name}}"</h3>
    <div>
      <label>Id: </label>{{hero.id}}</div>
    <div>
      <label>Name: </label>
      <input [(ngModel)]="hero.name" placeholder="name"/>
    </div>
    <button (click)="gotoPosts()">Back</button>
  </div>
  `,
})
export class PostDetailCompnt {

  constructor(@Inject(dispatcher) private dispatcher: Observer<Action>,
              @Inject(state)      private state: Observable<AppState>,
              private _router: Router,
              private _routeParams:RouteParams,
              private _postService:PostService,
              private _logger:Logger,
              private _elementRef: ElementRef
            ) {}

  ngOnInit() {
    let id = this._routeParams.get('id');
    // this._service.getHero(id).then(hero => this.hero = hero);
  }
  gotoPosts() {
    // Like <a [routerLink]="['Heroes']">Heroes</a>
    this._router.navigate(['Articles']);
  }
}
