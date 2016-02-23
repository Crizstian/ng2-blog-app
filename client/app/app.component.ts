import {Component,ElementRef}           from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES,
        RouterOutlet  }                 from 'angular2/router';
import {HeaderCompnt}                   from './components/header/header.compnt';
import {HomeCompnt}                     from './components/home/home.compnt';
import {ArticlesCompnt}                 from './components/articles/articles.compnt';
import {CategoriesCompnt}               from './components/categories/categories.compnt';
import {AboutCompnt}                    from './components/about/about.compnt';
import {ContactCompnt}                  from './components/contact/contact.compnt';
import {FooterCompnt}                   from './components/footer/footer.compnt';
import {PostDetailCompnt}               from './components/post/post-detail.compnt';
import {ManagementCompnt}               from './components/management/management.compnt';
import {ManagementPostCompnt}           from './components/management/managementPost.compnt';
import {ManagementPostDetailCompnt}     from './components/management/managementPostDetail.compnt';
import {ManagementCategoriesCompnt}     from './components/management/managementCategories.compnt';
import {ManagementCategoryDetailCompnt} from './components/management/managementCategoryDetail.compnt';
import {ManagementResourcesCompnt}      from './components/management/managementResources.compnt';
import {LoginCompnt}                    from './components/Login/login.compnt';
import {UserCompnt}                     from './components/User/user.compnt';
import {UserDetailCompnt}               from './components/User/userDetail.compnt';
import {ResourcesCompnt}                from './components/resources/resources.compnt';
import {ResourcesDetailCompnt}          from './components/resources/resourcesDetail.compnt';

import {PostService}                    from './services/PostService.service';
import {CategoryService}                from './services/Category.service';
import {Logger}                         from './services/Logger.service';
import {stateAndDispatcher}             from './logic/stateAndDispatcher';

declare var jQuery:any;
declare var foundation:any;

@Component({
  selector   : 'my-app',
  template   : `
              <div class="off-canvas-wrapper">
                <div class="off-canvas-wrapper-inner" data-off-canvas-wrapper>

                  <div class="title-bar" data-responsive-toggle="widemenu" data-sticky-container>

                    <div class="sticky" data-sticky>
                      <div class="title-bar-left">
                        <button class="menu-icon" type="button" data-open="offCanvasLeft"></button>
                        <span class="title-bar-title" data-open="offCanvasLeft"> </span>
                      </div>
                      <div class="title-bar-right">
                        <span class="subheader">CRamirez | code & blog <i class="mdi mdi-tag-text-outline"></i></span>
                        <h5><small>Knowing is different & Doing is different</small></h5>
                      </div>
                    </div>

                  </div>

                  <div class="off-canvas position-left" id="offCanvasLeft" data-off-canvas>

                    <!-- header goes here -->
                    <app-header></app-header>

                  </div>
                  
                  <div class="off-canvas-content" data-off-canvas-content>

                    <div class="row data-oulet">
                      <router-outlet></router-outlet>
                    </div>

                    <!-- footer goes here -->
                    <app-footer></app-footer>

                  </div>
                </div>
              </div>
              `,
  directives: [HeaderCompnt,RouterOutlet,FooterCompnt],
  providers : [stateAndDispatcher,PostService,CategoryService,Logger]
})
@RouteConfig([
  {path: '/',                      as: 'Home',                 component: HomeCompnt, useAsDefault: true},
  {path: '/articles',              as: 'Articles',             component: ArticlesCompnt},
  {path: '/categories',            as: 'Categories',           component: CategoriesCompnt},
  {path: '/about',                 as: 'About',                component: AboutCompnt},
  {path: '/contact',               as: 'Contact',              component: ContactCompnt},
  {path: '/post/:id',              as: 'PostDetail',           component: PostDetailCompnt},
  {path: '/management',            as: 'Management',           component: ManagementCompnt},
  {path: '/management/post',       as: 'ManagementPost',       component: ManagementPostCompnt},
  {path: '/management/post/:id',   as: 'ManagementPostDetail', component: ManagementPostDetailCompnt},
  {path: '/management/categories', as: 'ManagementCategories', component: ManagementCategoriesCompnt},
  {path: '/management/categories/:id', as: 'ManagementCategoryDetail', component: ManagementCategoryDetailCompnt},
  {path: '/management/resources',  as: 'ManagementResources',  component: ManagementResourcesCompnt},
  {path: '/login',                 as: 'Login',                component: LoginCompnt},
  {path: '/users',                 as: 'ManagementUsers',      component: UserCompnt},
  {path: '/users/user/:id',        as: 'UsersDetail',          component: UserDetailCompnt},
  {path: '/resources',             as: 'Resources',  component: ResourcesCompnt},
  {path: '/resources/r/:id',       as: 'ResourcesDetail',      component: ResourcesDetailCompnt}
  ])
  export class AppComponent{
    constructor(private elementRef: ElementRef) {
          this.elementRef = elementRef;
    }

    ngOnInit(){
      jQuery(this.elementRef.nativeElement).foundation();
    }
  }
