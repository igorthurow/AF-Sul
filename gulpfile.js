var gulp = require('gulp'),
    less = require('gulp-less'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    livereload = require ('gulp-livereload'),
    htmlmin = require('gulp-htmlmin'),
    image = require('gulp-image'),
    minifyjs = require('gulp-js-minify');
 
gulp.task('image', function () {
  gulp.src('./src/resources/*')
    .pipe(image())
    .pipe(gulp.dest('./app/resources'))
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('./src/*.less', ['less']);
  gulp.watch('./src/*.html', ['html']);
  gulp.watch('./src/*.js', ['minify-js']);
});

gulp.task('html', function() {
  gulp.src('./src/*.html')
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('./app/'))
  .pipe(livereload());
});

gulp.task('minify-js', function(){
  gulp.src('./src/*.js')
    .pipe(minifyjs())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./app/'))
    .pipe(livereload());
});

gulp.task('less', function () {
  return gulp.src('./src/*.less')
    .pipe(less().on('error', function (err) {
      console.log(err);
    }))
    .pipe(cssmin().on('error', function(err) {
      console.log(err);
    }))
    .pipe(livereload().on('error', function (err) {
      console.log(err); }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./app/'));
});
gulp.task('default', ['less', 'html', 'watch', 'minify-js']);
