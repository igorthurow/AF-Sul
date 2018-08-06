var gulp = require('gulp'),
    less = require('gulp-less'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    livereload = require ('gulp-livereload');

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('./css/*.less', ['less']);
  gulp.watch('./*.html', ['html']);
});

gulp.task('html', function() {
  gulp.src('./*.html')
  .pipe(livereload());
});

gulp.task('less', function () {
  return gulp.src('./css/*.less')
    .pipe(less().on('error', function (err) {
      console.log(err);
    }))
    .pipe(cssmin().on('error', function(err) {
      console.log(err);
    }))
    .pipe(livereload().on('error', function (err) {
      console.log(err); }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./'));
});
gulp.task('default', ['less', 'html', 'watch']);
