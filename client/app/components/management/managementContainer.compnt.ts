import {Component,ElementRef,
        Inject,Input, OnInit}           from 'angular2/core';
import {RouteConfig,
        RouterOutlet}                   from 'angular2/router';
import {ManagementCompnt}               from './management.compnt';
import {ManagementPostCompnt}           from './managementPost.compnt';
import {ManagementPostDetailCompnt}     from './managementPostDetail.compnt';
import {ManagementCategoriesCompnt}     from './managementCategories.compnt';
import {ManagementCategoryDetailCompnt} from './managementCategoryDetail.compnt';
import {ManagementResourcesCompnt}      from './managementResources.compnt';
import {ManagementAddCompnt}            from './managementAdd.compnt';
import {ManagementService}              from '../../services/Managament.service.compnt';

@Component({
  directives : [RouterOutlet],
  template   : `<router-outlet></router-outlet>`,
  providers  : [ManagementService]
})
@RouteConfig([
  {path: '/',               as: 'Management',               component: ManagementCompnt, useAsDefault: true},
  {path: '/add',            as: 'ManagementAdd',            component: ManagementAddCompnt},
  {path: '/post',           as: 'ManagementPost',           component: ManagementPostCompnt},
  {path: '/post/:id',       as: 'ManagementPostDetail',     component: ManagementPostDetailCompnt},
  {path: '/categories',     as: 'ManagementCategories',     component: ManagementCategoriesCompnt},
  {path: '/categories/:id', as: 'ManagementCategoryDetail', component: ManagementCategoryDetailCompnt},
  {path: '/resources',      as: 'ManagementResources',      component: ManagementResourcesCompnt}
  ])
export class ManagementContainer{

  constructor() {}

}
