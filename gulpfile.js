var gulp = require('gulp'),
    connect = require('gulp-connect'),
    opn = require('opn');

gulp.task('all', function() {
  gulp.src(['index.html', 'js/**/*', 'assets/**/*'])
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  var port = 8080;
  connect.server({
    root: '.',
    livereload: true,
    port: port
  });
  opn('http://localhost:' + port);
});

gulp.task('watch', function () {
  gulp.watch(['index.html', 'js/**/*', 'assets/**/*'], ['all']);
});

gulp.task('default', ['connect', 'watch']);
