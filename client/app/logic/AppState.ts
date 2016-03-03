import {Post} from '../models/Post';
import {Category} from '../models/category';

export interface stateRedux{
  items: Array<any>
}

export interface AppState {
  post: Array<any>,
  category: Array<any>
  management: Array<any>
}
