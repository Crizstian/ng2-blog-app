import {OpaqueToken,provide,Inject} from 'angular2/core';
import {Subject}                    from 'rxjs/Subject';
import {Injectable}                 from 'angular2/core';
import {AppState}                   from './AppState';
import {Category}                   from '../models/category';
import {Action,
        AddCategoryAction,
        DeleteCategoryAction,
        UpdateCategoryAction}       from './Actions';
import {Observable}                 from 'rxjs/Observable';


export function categories(initState: Category[], actions: Observable<Action>): Observable<Category[]> {
  //State is the accumulator && Action is the current value
  return actions.scan((state, action) => {
    if (action instanceof AddCategoryAction){
      state = state.filter(c => {
        if(c._id !== action._id)
          return true;
      });
      return [...state, categoryReducer(undefined,action)];
    }

    else if(action instanceof UpdateCategoryAction){
      return state.map(c => categoryReducer(c,action));
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
  if(action instanceof UpdateCategoryAction){
    const title = action.category.title;
    const description = action.category.description;
    return (action.category._id !== category._id) ? category : Object.assign({},category,{title,description});
  }
  else
    return category;
}
