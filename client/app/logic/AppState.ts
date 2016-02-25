import {Post} from '../models/Post';
import {Category} from '../models/category';

export interface AppState {
  post: Post[];
  category:Category[];
  visibilityFilter:string;
}
