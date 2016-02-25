///<reference path="../node_modules/angular2/typings/browser.d.ts"/>

import {bootstrap}                from 'angular2/platform/browser';
import {ROUTER_PROVIDERS}         from 'angular2/router';
import {HTTP_PROVIDERS}           from 'angular2/http';
import {AppComponent}             from './app.component';
import {enableProdMode,provide}   from 'angular2/core';
import {LocationStrategy,
        HashLocationStrategy}     from 'angular2/router';
import {stateAndDispatcher}       from './logic/newStateDispatcher';

enableProdMode();
bootstrap(AppComponent,
  [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(LocationStrategy,
       {useClass: HashLocationStrategy}),
    stateAndDispatcher
  ])
    .catch(err => console.error(err));
