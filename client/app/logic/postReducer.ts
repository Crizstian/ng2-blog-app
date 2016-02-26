import {AppState}                   from './AppState';
import {Post}                       from '../models/Post';
import {Action,AddPostAction,
        DeletePostAction,
        UpdatePostAction}        from './Actions';
import {Observable}                 from 'rxjs/Observable';

import 'rxjs/add/operator/scan';

export function posts(initState: Post[], actions: Observable<Action>): Observable<Post[]> {
  //State is the accumulator && Action is the current value
  return actions.scan((state, action) => {

    if (action instanceof AddPostAction){
      state = state.filter(c => {
        if(c._id !== action._id)
          return true;
      });
      return [...state, postReducer(undefined,action)];
    }

    else if(action instanceof UpdatePostAction){
      return state.map(c => postReducer(c,action));
    }

    else if(action instanceof DeletePostAction){
      return state.filter(t => t._id !== action.id);
    }

  }, initState);
}

function postReducer(post:Post, action:Action):any{
  if(action instanceof AddPostAction){
      return new AddPostAction(action.title,action.content,action.img,action.created,action._id);
  }
  if(action instanceof UpdatePostAction){
    const title = action.post.title;
    const content = action.post.content;
    return (action.post._id !== post._id) ? post : Object.assign({},post,{title,content});
  }
  else
    return post;
}
