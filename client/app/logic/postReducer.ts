import {OpaqueToken,provide,Inject} from 'angular2/core';
import {Subject}                    from 'rxjs/Subject';
import {Injectable}                 from 'angular2/core';
import {AppState,stateRedux}        from './AppState';
import {Post}                   from '../models/post';
import {Action,PostActions,networkAction,stateAction}       from './Actions';
import {Observable}                 from 'rxjs/Observable';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/share';

export function posts(initState: Post[], actions: Observable<Action>): Observable<Post[]> {
  //State is the accumulator && Action is the current value
  return actions.scan((state, action) => {

    if(action instanceof PostActions.Action){

      switch(action.action.type){
        // =============================
        case stateAction.REQUEST_DATA:
          return action.action.json.map(item => postReducer(item,'ADD_DATA'));
        // =============================
        case stateAction.RECEIVE_DATA:
          return state;
      }
    }
  }, initState).share();
}

function postReducer(item:any,type:string) {
  switch(type){
    case stateAction.ADD_DATA:
      return new Post(item.title,item.content,item.img,new Date(item.created),item._id);
    // case stateAction.UPDATE_DATA:

  }
}
