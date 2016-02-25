import {OpaqueToken,provide,Inject} from 'angular2/core';
import {Subject}                    from 'rxjs/Subject';
import {Injectable}                 from 'angular2/core';
import {AppState}                   from './AppState';
import {Category}                   from '../models/category';
import {Action,
        AddCategoryAction,
        DeleteCategoryAction}       from './Actions';
import {Observable}                 from 'rxjs/Observable';


export function categories(initState: Category[], actions: Observable<Action>): Observable<Category[]> {
  //State is the accumulator && Action is the current value
  return actions.scan((state, action) => {

    if (action instanceof AddCategoryAction){
      console.log(state);
      return [...state, categoryReducer(undefined,action)];
    }

    else if(action instanceof DeleteCategoryAction){
      return state.filter(t => t._id !== action.id);
    }

  }, initState);
}

function categoryReducer(category:Category, action:Action):any{
  if(action instanceof AddCategoryAction){
      return new AddCategoryAction(action.title,action.description,action.date,action._id);
  }
  else
    return category;
}
