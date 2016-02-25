export class AddPostAction {
  constructor(public _id?: string,
              public date?: string,
              public title:string='',
              public content:string='',
              public img:string=''
            ){}
}

export class DeletePostAction {
  constructor(public id: string){}
}

export class SetVisibilityFilter {
  constructor(public filter: string){}
}

export type ActionPost = AddPostAction|SetVisibilityFilter|DeletePostAction;

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

export type ActionCategory = AddCategoryAction|DeleteCategoryAction;

export type Action =  ActionPost|ActionCategory;
