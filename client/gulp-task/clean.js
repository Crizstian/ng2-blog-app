'use strict';
const gulp  = require('gulp');
const del   = require('del');
const paths = require('./constant').PATHS;

gulp.task('clean:dist', () => del(paths.DIST_PATH));

gulp.task('clean:tmp', () => del(paths.TMP_PATH));

gulp.task('clean', gulp.parallel(
  'clean:dist',
  'clean:tmp'
));
