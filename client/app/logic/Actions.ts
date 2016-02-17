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

export type Action = AddPostAction|SetVisibilityFilter|DeletePostAction;
