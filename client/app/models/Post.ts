export class Post {
  constructor(
    public title:string,
    public content:string,
    public img?:string,
    public created?:Date,
    public _id?:string){}

}
