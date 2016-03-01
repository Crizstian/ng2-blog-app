import {Component,ElementRef,
        Inject,Input}         from 'angular2/core';
import {RouteParams, Router,
        RouterLink}           from 'angular2/router';
import {FormBuilder,FORM_DIRECTIVES,
        ControlGroup,Control,
        Validators}           from 'angular2/common';
import {CategoryService}      from '../../services/Category.service';
import {Logger}               from '../../services/Logger.service';
import {Category}             from '../../models/category';

import {Observable}           from 'rxjs/Observable';
import {Observer}             from 'rxjs/Observer';
import {dispatcher,state}     from '../../logic/newStateDispatcher';
import {AppState}             from '../../logic/AppState';
import {Action,CategoryActions,stateAction}    from '../../logic/Actions';

declare var jQuery:any;
declare var foundation:any;

@Component({
  selector    : 'management-category-detail',
  directives  : [RouterLink,FORM_DIRECTIVES],
  templateUrl : 'app/components/management/templates/managementCategoriesDetail.html'
})
export class ManagementCategoryDetailCompnt {
  id:string;
  group: ControlGroup;
  category:Category;

  constructor(
    builder: FormBuilder,
    private _router: Router,
    private _routeParams:RouteParams,
    private _categoryService:CategoryService,
    private _logger:Logger,
    private _elementRef: ElementRef,
    @Inject(dispatcher) private _dispatcher: Observer<Action>,
    @Inject(state) private _state: Observable<AppState>
  ) {

    this.category = new Category('','');

    this.group = builder.group({
      title: ['',
        Validators.compose([Validators.required, Validators.minLength(2)])
      ],
      description: ['',
        Validators.compose([Validators.required, Validators.minLength(4)])
      ]
    });
  }

  ngOnInit() {
    jQuery(this._elementRef.nativeElement).foundation();
    this.id = this._routeParams.get('id');
    if(this.id != '0'){
      this._categoryService.get(this.id)
          .subscribe(
            category =>
              this.category = new Category(category[0].title,category[0].description,category[0].date,category[0]._id),
              err => this._logger.log('an error ocurred fetching category '+this.id));
    }
  }

  submitForm(){
    this._categoryService.save(this.category).subscribe(
      (data) => {},
      (err)  => {
        this._logger.log('Data NOT SAVED Correctly!');
      },
      ()     => {
        this._logger.log('Data Saved Correctly!');
        this._router.navigate(['/ManagementCategories']);
      });
  }

  updateForm(){
    this._categoryService.update(this.category).subscribe(
      (data) => {},
      (err)  => {
        this._logger.log('Data NOT UPDATED Correctly!');
      },
      ()     => {
        this._logger.log('Data Updated Correctly!');
        this._router.navigate(['/ManagementCategories']);
      });
  }

}
