import {Component,ElementRef,
        Inject,Input, OnInit} from 'angular2/core';
import {Router,RouterLink}    from 'angular2/router';
import {Observable}           from 'rxjs/Observable';
import {Observer}             from 'rxjs/Observer';
import {dispatcher,state}     from '../../logic/newStateDispatcher';
import {AppState}             from '../../logic/AppState';
import {Action,CategoryActions,stateAction}    from '../../logic/Actions';
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
    this._categoryService.getAll().subscribe(
      (data) => this._dispatcher.next(new CategoryActions.Action({
        type: stateAction.REQUEST_DATA,
        json: data
      })),
      (err)  => this._dispatcher.next(new CategoryActions.Action({
        type: stateAction.RECEIVE_DATA,
        err: err
      })),
      ()     => this._dispatcher.next(new CategoryActions.Action({
        type: stateAction.RECEIVE_DATA
      }))
    );
  }

  get getCategories() {

    return this._state.map(s => s.category.items.map(item => {return item}));
  }

  openCategory(id:string){
    this._router.navigate( ['ManagementCategoryDetail', {id: id} ] );
  }

  deleteCategory(id:string){
    this._categoryService.delete(id).subscribe(
      (data) => {
        this._dispatcher.next(new CategoryActions.Action({
          type: stateAction.DELETE_DATA,
          id
        }));
      },
      (err)  => this._logger.log('Data NOT DELETED Correctly!'),
      ()     => this._logger.log('Data Deleted Correctly!'));
  }

}
