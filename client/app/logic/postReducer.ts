import {AppState}                   from './AppState';
import {Post}                       from '../models/Post';
import {Action,AddPostAction,
        DeletePostAction,
        SetVisibilityFilter}        from './Actions';
import {Observable}                 from 'rxjs/Observable';

import 'rxjs/add/operator/scan';

export function posts(initState: Post[], actions: Observable<Action>): Observable<Post[]> {
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
