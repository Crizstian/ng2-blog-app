import {Post} from '../models/Post';
import {Category} from '../models/category';

export interface stateRedux{
  isFetching:boolean,
  didInvalidate:boolean,
  items:Array<any>
}

export interface AppState {
  post: stateRedux,
  category: stateRedux
  management: stateRedux
}
