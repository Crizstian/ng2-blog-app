import {Component,ElementRef,Inject}           from 'angular2/core';
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
import {ManagementContainer}            from './components/management/managementContainer.compnt';
import {LoginCompnt}                    from './components/Login/login.compnt';
import {UserCompnt}                     from './components/User/user.compnt';
import {UserDetailCompnt}               from './components/User/userDetail.compnt';
import {ResourcesCompnt}                from './components/resources/resources.compnt';
import {ResourcesDetailCompnt}          from './components/resources/resourcesDetail.compnt';

import {PostService}                    from './services/PostService.service';
import {CategoryService}                from './services/Category.service';
import {Logger}                         from './services/Logger.service';

declare var jQuery:any;
declare var foundation:any;

@Component({
  selector   : 'my-app',
  template   : `

              <div class="off-canvas-wrapper">
              <div class="off-canvas-wrapper-inner" data-off-canvas-wrapper>

                <!-- off-canvas title bar for 'small' screen -->
                <div class="title-bar" data-responsive-toggle="widemenu" data-hide-for="medium">
                  <div class="title-bar-left">
                    <button class="menu-icon" type="button" data-open="offCanvasLeft"></button>
                    <span class="title-bar-title" data-open="offCanvasLeft"> </span>
                  </div>
                  <div class="title-bar-right">
                    <span class="subheader">CRamirez | code & blog <i class="mdi mdi-tag-text-outline"></i></span>
                    <h5><small>Knowing is different & Doing is different</small></h5>
                  </div>
                </div>

                <!-- off-canvas left menu -->
                <div class="off-canvas position-left" id="offCanvasLeft" data-off-canvas>
                  <app-header></app-header>

                </div>

                <!-- "wider" top-bar menu for 'medium' and up -->
                <div id="widemenu" class="top-bar">
                  <div class="top-bar-left">


                  </div>
                </div>

                <!-- original content goes in this container -->
                <div class="off-canvas-content" data-off-canvas-content>
                  <div class="expanded row data-oulet">
                    <div class="large-3 column show-for-large" >
                      <app-header></app-header>
                    </div>
                    <div class="large-9 column">
                      <router-outlet></router-outlet>
                    </div>
                  </div>

                  <!-- footer goes here -->
                  <app-footer></app-footer>
                </div>

              <!-- close wrapper, no more content after this -->
              </div>
            </div>
              `,
  directives: [HeaderCompnt,RouterOutlet,FooterCompnt],
  providers : [PostService,CategoryService,Logger]
})
@RouteConfig([
  {path: '/',                      as: 'Home',                 component: HomeCompnt, useAsDefault: true},
  {path: '/articles',              as: 'Articles',             component: ArticlesCompnt},
  {path: '/categories',            as: 'Categories',           component: CategoriesCompnt},
  {path: '/about',                 as: 'About',                component: AboutCompnt},
  {path: '/contact',               as: 'Contact',              component: ContactCompnt},
  {path: '/post/:id',              as: 'PostDetail',           component: PostDetailCompnt},
  {path: '/management/...',        as: 'ManagementContainer',  component: ManagementContainer},
  {path: '/login',                 as: 'Login',                component: LoginCompnt},
  {path: '/users',                 as: 'ManagementUsers',      component: UserCompnt},
  {path: '/users/user/:id',        as: 'UsersDetail',          component: UserDetailCompnt},
  {path: '/resources',             as: 'Resources',            component: ResourcesCompnt},
  {path: '/resources/r/:id',       as: 'ResourcesDetail',      component: ResourcesDetailCompnt}
  ])
  export class AppComponent{
    constructor(private elementRef: ElementRef){
          this.elementRef = elementRef;
    }

    ngOnInit(){
      jQuery(this.elementRef.nativeElement).foundation();
    }
  }
