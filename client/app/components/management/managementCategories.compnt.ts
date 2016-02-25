import {Component,ElementRef,
        Inject,Input, OnInit} from 'angular2/core';
import {Router,RouterLink}    from 'angular2/router';
import {Observable}           from 'rxjs/Observable';
import {Observer}             from 'rxjs/Observer';
import {dispatcher,state}     from '../../logic/newStateDispatcher';
import {AppState}             from '../../logic/AppState';
import {Action,
        AddCategoryAction}    from '../../logic/Actions';
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
              private _elementRef: ElementRef,
              @Inject(dispatcher) private _dispatcher: Observer<Action>,
              @Inject(state) private _state: Observable<AppState>
            ) {}


  ngOnInit() {
    jQuery(this._elementRef.nativeElement).foundation();
    this._categoryService.getAll()
        .subscribe((data) =>
          data.forEach((item) =>
            this._dispatcher.next(new AddCategoryAction(
              item.title,item.description,item.date,item._id
            ))
          ),
          (err) => this._logger.log(err),
          ()    => this._logger.log('Categories Data Fetched completed!'));
  }

  get getCategories() {
    // this._state.subscribe(s => console.log("state: "+s));
    return ['hello','world'];
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
