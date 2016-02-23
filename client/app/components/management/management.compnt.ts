import {Component,ElementRef,
        Inject,Input, OnInit} from 'angular2/core';
import {Router}               from 'angular2/router';
import {Observable}           from 'rxjs/Observable';
import {Observer}             from 'rxjs/Observer';
import {AppState}             from '../../logic/AppState';
import {Action,AddPostAction,
        DeletePostAction}     from '../../logic/Actions';
import {Logger}               from '../../services/Logger.service';

declare var jQuery:any;
declare var foundation:any;

@Component({
  selector   : 'app-management',
  templateUrl: 'app/components/management/templates/management.html'
})
export class ManagementCompnt implements OnInit{

  managementTools:Object[] = [
    {
      title: 'Post',
      user: 'Cristian Ramirez',
      date: '18/feb/2016',
      num: 125,
      img: '../app/img/back1.jpg',
      link: 'ManagementPost'
    },
    {
      title: 'Categories',
      user: 'Cristian Ramirez',
      date: '18/feb/2016',
      num: 10,
      img: '../app/img/back1.jpg',
      link: 'ManagementCategories'
    },
    {
      title: 'Users',
      user: 'Cristian Ramirez',
      date: '18/feb/2016',
      num: 1,
      img: '../app/img/back1.jpg',
      link: 'ManagementUsers'
    },
    {
      title: 'Resources',
      user: 'Cristian Ramirez',
      date: '18/feb/2016',
      num: 15,
      img: '../app/img/back1.jpg',
      link: 'ManagementResources'
    }
  ];

  constructor(
              private _router: Router,
              private _logger:Logger,
              private _elementRef: ElementRef
            ) {}

  ngOnInit() {
    jQuery(this._elementRef.nativeElement).foundation();

  }


  openSection(id:string){
    this._router.navigate( [id] );
  }

  deleteSection(id:string){
    console.log('section deleted! '+id);
  }

}
