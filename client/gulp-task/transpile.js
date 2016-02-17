'use strict';
const gulp       = require('gulp');
const ts         = require('gulp-typescript');
const tslint     = require('gulp-tslint');
const plumber    = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const notify     = require('gulp-notify');
const bs         = require('browser-sync');
const PATHS      = require('./constant').PATHS;
const config     = require('../tsconfig.json');
const files      =
  [
    "./app/**/*.ts"
  ];


/**
 * @name   transpileTS
 * @desc   Tanspile TypeScript file
 * @return {Stream}
 */
 function transpileTS(name, destPath) {
   return function transpileTS() {
     return gulp.src(files, { since: gulp.lastRun(name) })
      //  .pipe(plumber({errorHandler: notify.onError("TS compilation failed !")}))
       .pipe(sourcemaps.init())
       .pipe(ts(config.compilerOptions))
       .pipe(sourcemaps.write())
       .pipe(gulp.dest(`${destPath}/app`));
   }
 }

/**
 * @name   lintTS
 * @desc   Lint TypeScript file
 * @return {Stream}
 */
function lintTS(name) {
  return function lintTS() {
    return gulp.src(files, { since: gulp.lastRun(name) })
      .pipe(plumber({errorHandler: notify.onError("TS linting failed !")}))
      .pipe(tslint())
      .pipe(tslint.report('prose'));
  };
}

gulp.task('lintTS', lintTS('lintTS'));

gulp.task('transpile:dist',
  gulp.series(
    transpileTS('transpile:dist', PATHS.DIST_PATH)
  ));
