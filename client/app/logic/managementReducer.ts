import {OpaqueToken,provide,Inject} from 'angular2/core';
import {Subject}                    from 'rxjs/Subject';
import {Injectable}                 from 'angular2/core';
import {AppState,stateRedux}        from './AppState';
import {ManagementModel}                   from '../models/management';
import {Action,ManagementActions,networkAction,stateAction}       from './Actions';
import {Observable}                 from 'rxjs/Observable';


export function managements(initState: stateRedux, actions: Observable<Action>): Observable<Object> {
  //State is the accumulator && Action is the current value
  return actions.scan((state, action) => {
    let items = [];
    switch(action.action.type){
      // =============================
      case stateAction.REQUEST_DATA:

        return Object.assign({}, state, {
          isFetching: true,
          didInvalidate: false,
          items: action.action.json.map(item => managementReducer(item,'ADD_DATA'))
        });
      // =============================
      case stateAction.RECEIVE_DATA:
        let didInvalidate = false;
        items         = state.items;

        if(action.action.err){
          didInvalidate = true;
          items         = [];
        }

        return Object.assign({}, state, {
            isFetching: false,
            didInvalidate,
            items
          });
        // =============================
        case stateAction.DELETE_DATA:
          return Object.assign({}, state, {
              isFetching: false,
              didInvalidate: false,
              items: state.items.filter(t => t._id !== action.action.id)
            });
        // =============================
        case stateAction.ADD_DATA:
          return Object.assign({}, state, {
              isFetching: false,
              didInvalidate: false,
              items: [...state.items, managementReducer(action.action.json,stateAction.ADD_DATA)]
            });
        // =============================
        case stateAction.UPDATE_DATA:
          return Object.assign({}, state, {
              isFetching: false,
              didInvalidate: false,
              items: state.items.map(item => (item._id !== action.action.id) ?
                item : managementReducer(item,stateAction.UPDATE_DATA))
            });

    }
  }, initState);
}

function managementReducer(item:any,type:string) {
  switch(type){
    case stateAction.ADD_DATA:
      return new ManagementModel(item.title,item.link,new Date(item.created),item.num,item.img,item.user,item._id);
    // case stateAction.UPDATE_DATA:

  }
}
