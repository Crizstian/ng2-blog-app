import {Post} from '../models/Post';

export interface AppState {
  posts: Post[];
  visibilityFilter:string;
}
