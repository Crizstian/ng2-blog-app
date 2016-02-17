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
import {stateAndDispatcher}             from './logic/stateAndDispatcher';
import {PostService}                    from './services/PostService.service';
import {Logger}                         from './services/Logger.service';

declare var jQuery:any;
declare var foundation:any;

@Component({
  selector   : 'my-app',
  template   : `
                <div class="off-canvas-wrapper">
                  <div class="off-canvas-wrapper-inner" data-off-canvas-wrapper>

                    <!-- header goes here -->
                    <app-header></app-header>

                    <!-- original content goes in this container -->
                    <div class="off-canvas-content" data-off-canvas-content>
                      <div class="row column data-oulet">
                        <router-outlet></router-outlet>
                      </div>
                    </div>

                    <!-- footer goes here -->

                  <!-- close wrapper, no more content after this -->
                  </div>
                </div>
              `,
  directives: [HeaderCompnt,RouterOutlet,FooterCompnt],
  providers: [stateAndDispatcher,PostService,Logger]
})
@RouteConfig([
  {path: '/',           as: 'Home',       component: HomeCompnt, useAsDefault: true},
  {path: '/articles',   as: 'Articles',   component: ArticlesCompnt},
  {path: '/categories', as: 'Categories', component: CategoriesCompnt},
  {path: '/about',      as: 'About',      component: AboutCompnt},
  {path: '/contact',    as: 'Contact',    component: ContactCompnt},
  {path: '/post/:id',   as: 'PostDetail', component: PostDetailCompnt}
  ])
  export class AppComponent{
    constructor(private elementRef: ElementRef) {
          this.elementRef = elementRef;
    }

    ngOnInit(){
      jQuery(this.elementRef.nativeElement).foundation();
    }
  }
