'use strict';
const gulp        = require('gulp');
const mergeStream = require('merge-stream');
const glob        = require('glob');
const PATHS       = require('./constant').PATHS;

function copy(paths) {
  return Object.keys(paths).reduce((acc, path) => {
    return mergeStream(acc, gulp.src(path).pipe(gulp.dest(paths[path])));
  }, gulp.src('.'));
}

// Copy static files
gulp.task('copy:dist:template', () => {
  return copy({
    './index.html': PATHS.DIST_PATH,
    './app/**/*.html': PATHS.DIST_PATH
  });
});

// Copy css files
gulp.task('copy:dist:css', () => {
  return copy({
    './app/**/*.css': PATHS.DIST_PATH
  });
});

// Copy vendor files
gulp.task('copy:dist:vendor', () => {
  return copy({
    './bower_components/**/*.js': `${ PATHS.DIST_PATH }/vendor/js`,
    './bower_components/**/*.css': `${ PATHS.DIST_PATH }/vendor/css`
  });
});

// Copy Angular 2 files
gulp.task('copy:dist:angular2', () => {
  return copy({
    [
      './node_modules/angular2/bundles/angular2-polyfills.js',
      './node_modules/systemjs/dist/system.src.js',
      './node_modules/rxjs/bundles/Rx.js',
      './node_modules/angular2/bundles/angular2.dev.js',
      './node_modules/angular2/bundles/router.dev.js',
      './node_modules/immutable/dist/immutable.js',
      './node_modules/angular2/bundles/http.dev.js',
    ]: `${PATHS.DIST_PATH}/lib`
  });
});

// Gulp Task for copy
gulp.task('copy:dist:dev',
  gulp.parallel(
    'copy:dist:static',
    'copy:dist:template',
    'copy:dist:css',
    'copy:dist:vendor',
    'copy:dist:angular2'
  ));
