import {Component,Input,
        Output, EventEmitter } from 'angular2/core';
import {Post}            from '../../models/Post';

@Component({
  selector    : 'article-item',
  templateUrl : 'app/components/articles/templates/article-item.html'
})
export class ArticleItem {

  @Input() post;
  @Input() type;
  @Output() read = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
           "Aug", "Sep", "Oct", "Nov", "Dec"];
}
