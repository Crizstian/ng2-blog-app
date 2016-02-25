import {OpaqueToken,provide,Inject} from 'angular2/core';
import {Subject}                    from 'rxjs/Subject';
import {AppState}                   from './AppState';
import {Action}                     from './Actions';
import {Observable}                 from 'rxjs/Observable';
import {BehaviorSubject}            from 'rxjs/subject/BehaviorSubject';
import {posts}                      from './postReducer';
import {categories}                 from './categoryReducer';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/zip';


const initState         = new OpaqueToken("initState");
const initDriver        = new OpaqueToken("initDriver");
export const dispatcher = new OpaqueToken("dispatcher");
export const state      = new OpaqueToken("state");

const initValue:AppState = {
  post : [],
  category : [],
  visibilityFilter: ''
}

const drivers = {
  post: posts,
  category: categories
}

function configDispatcher(drivers):Observable<Action>{
  // const proxySources = {};
  // Object.keys(drivers).forEach(key => {
  //   proxySources[key] = new Subject<Action>(null);
  // });
  return new Subject<Action>(null);
}

function configState(initState: AppState, actions:Observable<Action>): Observable<AppState> {
  let appState:Observable<AppState> = new Subject();

  const combine = s => ({post: s[0], category: s[1], visibilityFilter: s[2]});
  Object.keys(drivers).forEach(key => {
    appState.zip(drivers[key](initValue[key], actions));
  });
  appState = appState.map(combine);
  return wrapIntoBehavior(initState, appState);
}


function wrapIntoBehavior(init, obs) {
 const res = new BehaviorSubject(init);
 obs.subscribe(s => {res.next(s)});
 return res;
}


export const stateAndDispatcher = [
  provide(initDriver, {useValue: drivers }),
  provide(initState,  {useValue: initValue }),
  provide(dispatcher, {useFactory: configDispatcher, deps: [new Inject(initDriver)]}),
  provide(state,      {useFactory: configState, deps: [new Inject(initState), new Inject(dispatcher)]})
];
