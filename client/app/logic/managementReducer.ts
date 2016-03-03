import {OpaqueToken,provide,Inject} from 'angular2/core';
import {Subject}                    from 'rxjs/Subject';
import {Injectable}                 from 'angular2/core';
import {AppState,stateRedux}        from './AppState';
import {ManagementModel}                   from '../models/management';
import {Action,ManagementActions,networkAction,stateAction}       from './Actions';
import {Observable}                 from 'rxjs/Observable';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/share';


export function managements(initState: ManagementModel[], actions: Observable<Action>): Observable<ManagementModel[]> {
  //State is the accumulator && Action is the current value
  return actions.scan((state, action) => {
    if(action instanceof ManagementActions.Action){
      switch(action.action.type){
        // =============================
        case stateAction.REQUEST_DATA:
          return action.action.json.map(item => managementReducer(item,'ADD_DATA'));;
        // =============================
        case stateAction.RECEIVE_DATA:
          return state;
          // // =============================
          // case stateAction.DELETE_DATA:
          //   return Object.assign({}, state, {
          //       isFetching: false,
          //       didInvalidate: false,
          //       items: state.items.filter(t => t._id !== action.action.id)
          //     });
          // // =============================
          // case stateAction.ADD_DATA:
          //   return Object.assign({}, state, {
          //       isFetching: false,
          //       didInvalidate: false,
          //       items: [...state.items, managementReducer(action.action.json,stateAction.ADD_DATA)]
          //     });
          // // =============================
          // case stateAction.UPDATE_DATA:
          //   return Object.assign({}, state, {
          //       isFetching: false,
          //       didInvalidate: false,
          //       items: state.items.map(item => (item._id !== action.action.id) ?
          //         item : managementReducer(item,stateAction.UPDATE_DATA))
          //     });

      }
    }

  }, initState).share();
}

function managementReducer(item:any,type:string) {
  switch(type){
    case stateAction.ADD_DATA:
      return new ManagementModel(item.title,item.link,new Date(item.created),item.num,item.img,item.user,item._id);
    // case stateAction.UPDATE_DATA:

  }
}
