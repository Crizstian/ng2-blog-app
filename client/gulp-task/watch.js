'use strict';
const gulp     = require('gulp');
const excludes = ['!./node_modules/**'];

gulp.task('watch', (done) => {

  gulp.watch(
    ['./app/**/*.ts'].concat(excludes),
    gulp.series('transpile:dist', 'server:reload')
  );

  gulp.watch(
    ['./app/**/*.html','index.html'].concat(excludes),
    gulp.series(
      gulp.parallel('copy:dist:template'),
      'server:reload'
    ));

  gulp.watch(
    ['./app/**/*.(css|scss)','index.html'].concat(excludes),
    gulp.series(
      gulp.parallel('copy:dist:css','sass'),
      'server:reload'
    ));

    gulp.watch(
      ['./app/**/*.(jpg|png|jpeg)'].concat(excludes),
      gulp.series(
        gulp.parallel('copy:dist:template'),
        'server:reload'
      ));

  done();

});
