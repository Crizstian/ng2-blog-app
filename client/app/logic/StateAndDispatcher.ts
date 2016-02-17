import {OpaqueToken,provide,Inject} from 'angular2/core';
import {Subject}                    from 'rxjs/Subject';
import {Injectable}                 from 'angular2/core';
import {AppState}                   from './AppState';
import {Post}                       from '../models/Post';
import {Action,AddPostAction,
        DeletePostAction,
        SetVisibilityFilter}        from './Actions';
import {Observable}                 from 'rxjs/Observable';
import {BehaviorSubject}            from 'rxjs/subject/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/zip';

const initState         = new OpaqueToken("initState");
export const dispatcher = new OpaqueToken("dispatcher");
export const state      = new OpaqueToken("state");

export const stateAndDispatcher = [
  provide(initState,  {useValue: {posts: [], visibilityFilter: 'started'}}),
  provide(dispatcher, {useValue: new Subject<Action>(null)}),
  provide(state,      {useFactory: stateFn, deps: [new Inject(initState), new Inject(dispatcher)]})
];

//function that returns an Observable of the appState
 function stateFn(initState: AppState, actions: Observable<Action>): Observable<AppState> {

  const combine = s => ({posts: s[0], visibilityFilter: s[1]});
  const appStateObs: Observable<AppState> = posts(initState.posts, actions).
  zip(filter(initState.visibilityFilter, actions)).map(combine);

  return wrapIntoBehavior(initState, appStateObs);
}

 function wrapIntoBehavior(init, obs) {
  const res = new BehaviorSubject(init);
  obs.subscribe(s => {res.next(s)});
  return res;
}

function posts(initState: Post[], actions: Observable<Action>): Observable<Post[]> {
  //State is the accumulator && Action is the current value
  return actions.scan((state, action) => {

    if (action instanceof AddPostAction)
      return [...state, postReducer(undefined,action)];

    else if(action instanceof DeletePostAction){
      return state.filter(t => t._id !== action.id);
    }

  }, initState);
}

function postReducer(post:Post, action:Action):any{
  if(action instanceof AddPostAction){
      return new AddPostAction(
        action._id,
        action.date,
        action.title,
        action.content,
        action.img
      );
  }
  else
    return post;
}

function filter(initState: string, actions: Observable<Action>): Observable<string> {
  return actions.scan((state, action) => {
    if (action instanceof SetVisibilityFilter) {
      return action.filter;
    } else {
      return state;
    }
  }, initState);
}
