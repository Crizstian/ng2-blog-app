import {Component,ElementRef,
        Inject,Input, OnInit} from 'angular2/core';
import {Router,RouterLink}    from 'angular2/router';
import {Observable}           from 'rxjs/Observable';
import {CategoryService}      from '../../services/Category.service';
import {Logger}               from '../../services/Logger.service';
import {Category}             from '../../models/category';

declare var jQuery:any;
declare var foundation:any;

@Component({
  selector   : 'app-management-categories',
  directives : [RouterLink],
  templateUrl: 'app/components/management/templates/managementCategories.html'
})
export class ManagementCategoriesCompnt{

  constructor(
              private _router: Router,
              private _categoryService:CategoryService,
              private _logger:Logger,
              private _elementRef: ElementRef
            ) {}


  ngOnInit() {
    jQuery(this._elementRef.nativeElement).foundation();
    this._categoryService.getAll()
        .subscribe((data) =>
          data.forEach((item) => {
            this._categoryService.categories =
              [...this._categoryService.categories, new Category(item.title,item.description,item.date,item._id)];
          }));
  }

  get getCategories() {
    return this._categoryService.categories;
  }

  openCategory(id:string){
    this._router.navigate( ['ManagementCategoryDetail', {id: id} ] );
  }

  deleteCategory(id:string){
    this._categoryService.delete(id)
        .subscribe(
          data => this._logger.log(data.category),
          err => this._logger.log('an error ocurred deleting '+id)
        );
  }

}
