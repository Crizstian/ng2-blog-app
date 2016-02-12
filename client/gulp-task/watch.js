'use strict';
const gulp     = require('gulp');
const excludes = ['!./node_modules/**'];

gulp.task('watch', (done) => {

  gulp.watch(
    ['./app/**/*.ts'].concat(excludes),
    gulp.series('transpile:dist', 'server:reload')
  );

  gulp.watch(
    ['./app/**/*.(html|css)','index.html'].concat(excludes),
    gulp.series(
      gulp.parallel('copy:dist:template','copy:dist:css'),
      'server:reload'
    ));

  done();

});
