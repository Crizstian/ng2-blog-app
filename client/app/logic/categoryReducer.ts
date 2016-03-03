import {OpaqueToken,provide,Inject} from 'angular2/core';
import {Subject}                    from 'rxjs/Subject';
import {Injectable}                 from 'angular2/core';
import {AppState,stateRedux}        from './AppState';
import {Category}                   from '../models/category';
import {Action,CategoryActions,networkAction,stateAction}       from './Actions';
import {Observable}                 from 'rxjs/Observable';
import {CategoryService}            from '../services/Category.service';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/share';


export function categories(initState: Category[], actions: Observable<Action>): Observable<Category[]> {
  //State is the accumulator && Action is the current value
  return actions.scan((state, action) => {
    if(action instanceof CategoryActions.Action){
      switch(action.action.type){
        // =============================
        case stateAction.REQUEST_DATA:
          return action.action.json.map(item => categoryReducer(item,'ADD_DATA'));
        // =============================
        case stateAction.RECEIVE_DATA:
          return state;
      }
    }
  }, initState).share();
}

function categoryReducer(item:any,type:string) {
  switch(type){
    case stateAction.ADD_DATA:
      return new Category(item.title,item.description,item.created,item._id);
    // case stateAction.UPDATE_DATA:

  }
}
