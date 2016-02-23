'use strict';
const gulp  = require('gulp');
const $     = require('gulp-load-plugins')();
const PATHS = require('./constant').PATHS;
const isProduction = false;

// Compiles Sass
gulp.task('sass', () => {
  var minifyCss = $.if(isProduction, $.minifyCss());

  return gulp.src([
    'bower_components/foundation-sites/scss/',
    'app/**/*.scss'
  ])
    .pipe($.sass({
      includePaths: PATHS.SASS,
      outputStyle: (isProduction ? 'compressed' : 'nested'),
      errLogToConsole: true
    }))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie 10']
    }))
    .pipe(minifyCss)
    .pipe(gulp.dest(`${PATHS.DIST_PATH}/app`))
  ;
});
