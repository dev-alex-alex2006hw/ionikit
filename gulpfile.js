'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    wiredep = require('wiredep').stream;

var PORT = 8100;

/*
 * default task
 */
gulp.task('default', ['clean', 'serve']);

/*
 * serve
 * start server with browser sync enabled
 */
gulp.task('serve', ['styles', 'bower-inject'], function () {

  browserSync({
    notify: true,
    server: {
      baseDir: ['.tmp', 'app'],
    },
    port: PORT,
    online: true
  });

  gulp.watch(['app/**/*.html'], reload);
  gulp.watch(['app/styles/**/*.{scss,css}'], ['styles']);
  gulp.watch(['app/js/**/*.js'], ['jshint', reload]);
  gulp.watch(['app/images/**/*'], reload);
  gulp.watch(['./bower.json'], ['bower-inject', reload]);
});

/*
 * JsHint
 */
gulp.task('jshint', function () {
  return gulp.src('app/js/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});

/*
 * styles
 * compile sass
 */
gulp.task('styles', function () {
  return gulp.src([
    'app/styles/*.scss'
  ])
    .pipe($.changed('styles', {extension: '.scss'}))
    .pipe($.sass())
    .on('error', console.error.bind(console))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(gulp.dest('www/styles'))
    .pipe(reload({stream:true}));
});

/*
 * bower-inject
 * inject dependencies to index.html
 */
gulp.task('bower-inject', function () {
  gulp.src('app/index.html')
    .pipe(wiredep({
      exclude: [ /ionic\.css/ ],
    }))
    .pipe(gulp.dest('app/'));
});

/*
 * clean
 */
gulp.task('clean', function() {
  return gulp.src(['www', '.tmp'], { read: false })
    .pipe($.rimraf());
});
