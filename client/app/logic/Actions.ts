import {Category}         from '../models/category';
import {Post}             from '../models/Post';
import {ManagementModel}  from '../models/management';

import {PostService}      from '../services/PostService.service';
import {CategoryService}  from '../services/Category.service';
import {ManagementService} from '../services/Managament.service.compnt';
import {Observable}                 from 'rxjs/Observable';

// ============================================================================

export const networkAction = {
  REQUEST_ALL_DATA     : 'REQUEST_ALL_DATA',
  REQUEST_SAVE_DATA    : 'REQUEST_SAVE_DATA',
  REQUEST_DELETE_DATA  : 'REQUEST_DELETE_DATA',
  REQUEST_UPDATE_DATA  : 'REQUEST_UPDATE_DATA',
  REQUEST_GET_ONE_DATA : 'REQUEST_GET_ONE_DATA',
  RECEIVE_DATA         : 'RECEIVE_DATA'
}

export const stateAction = {
  ADD_DATA    : 'ADD_DATA',
  UPDATE_DATA : 'UPDATE_DATA',
  DELETE_DATA : 'DELETE_DATA',
  REQUEST_DATA: 'REQUEST_DATA',
  RECEIVE_DATA: 'RECEIVE_DATA'
}

// ============================================================================

export module CategoryActions{

  interface Data {
    service?:Observable<any>;
    type?:string;
    category?:Category
    id?:string;
    json?:Array<any>;
    err?: string
  }

  export class Action {
    constructor(public action:Data){}
  }
}

type ActionCategory = CategoryActions.Action;

// ============================================================================

export module PostActions{

  interface Data {
    service?:Observable<any>;
    type?:string;
    post?:Post
    id?:string;
    json?:Array<any>;
    err?: string
  }

  export class Action {
    constructor(public action:Data){}
  }
}

type ActionPost = PostActions.Action;

// ============================================================================

export module ManagementActions{

  interface Data {
    service?:Observable<any>;
    type?:string;
    post?:Post
    id?:string;
    json?:Array<any>;
    err?: string
  }

  export class Action {
    constructor(public action:Data){}
  }
}

type ActionManagement = ManagementActions.Action;

// ============================================================================

export type Action =  ActionCategory|ActionPost|ActionManagement;
