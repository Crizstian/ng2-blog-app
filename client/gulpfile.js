'use strict';
const gulp        = require('gulp');
const HubRegistry = require('gulp-hub');
const hub         = new HubRegistry(['./gulp-task/*.js']);

// Development Tasks
gulp.task('default', gulp.series(
  'clean',
  gulp.parallel('transpile:dist', 'sass', 'copy:dist:dev'),
  'server',
  'watch'
));
