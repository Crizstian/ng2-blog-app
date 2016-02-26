import {Category} from '../models/category';
import {Post}     from '../models/Post';

export class AddPostAction {
  constructor(
    public title:string,
    public content:string,
    public img?:string,
    public created?:Date,
    public _id?:string
  ){}
}

export class DeletePostAction {
  constructor(public id: string){}
}

export class UpdatePostAction {
  constructor(public post:Post){}
}

export class SetVisibilityFilter {
  constructor(public filter: string){}
}

export type ActionPost = AddPostAction|UpdatePostAction|DeletePostAction;

export class AddCategoryAction {
  constructor(public title:string,
              public description:string,
              public date?:Date,
              public _id?:string
            ){}
}

export class DeleteCategoryAction {
  constructor(public id: string){}
}

export class UpdateCategoryAction {
  constructor(public category:Category){}
}

export type ActionCategory = AddCategoryAction|DeleteCategoryAction|UpdateCategoryAction;

export type Action =  ActionPost|ActionCategory;
