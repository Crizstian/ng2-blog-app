import {OpaqueToken,provide,Inject} from 'angular2/core';
import {Subject}                    from 'rxjs/Subject';
import {AppState}                   from './AppState';
import {Action}                     from './Actions';
import {Observable}                 from 'rxjs/Observable';
import {BehaviorSubject}            from 'rxjs/subject/BehaviorSubject';
import {posts}                      from './postReducer';
import {categories}                 from './categoryReducer';
import {managements}                from './managementReducer';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/zip';


const initState         = new OpaqueToken("initState");
const initDriver        = new OpaqueToken("initDriver");
export const dispatcher = new OpaqueToken("dispatcher");
export const state      = new OpaqueToken("state");

const initValue = {
  post:[],
  category: [],
  management: []
}

const drivers = {
  post: posts,
  category: categories,
  management: managements
}

function configDispatcher(drivers):Observable<Action>{
  // const proxySources = {};
  // Object.keys(drivers).forEach(key => {
  //   proxySources[key] = new Subject<Action>(null);
  // });
  return new Subject<Action>(null);
}

function configState(initState: AppState, actions:Observable<Action>,drivers:any): Observable<AppState> {

  const combine = s => ({post: s[0], category: s[1], management: s[2]});

  let appState:Observable<AppState> = drivers.post(initState.post,actions)
                                      .zip(drivers.category(initState.category,actions),
                                           drivers.management(initState.management,actions))
                                      .map(combine);

  // let proxySources:any = [];
  // Object.keys(drivers).forEach(key => {
  //   proxySources.push(drivers[key](initState[key],actions));
  // });
  //
  // let appState:Observable<AppState> = new Subject<Action>(null)
  //                                     .zip(...proxySources)
  //                                     .map(combine);

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
  provide(state,      {useFactory: configState, deps: [new Inject(initState), new Inject(dispatcher), new Inject(initDriver)]})
];
