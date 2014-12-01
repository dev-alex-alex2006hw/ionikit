'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    karma = require('karma').server,
    runSequence = require('run-sequence'),
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
gulp.task('serve', ['styles', 'bower-inject', 'js-inject'], function () {

  browserSync({
    notify: true,
    server: {
      baseDir: ['.tmp', 'app'],
    },
    port: PORT,
    online: true
  });

  karma.start({
    configFile: __dirname + '/karma.conf.js'
  });

  $.watch(['app/**/*.html'], reload);

  $.watch(['app/styles/**/*.{scss,css}'], function() {
    return runSequence('styles');
  });

  $.watch(['app/js/**/*.js'], function() {
    return runSequence('jshint', 'js-inject');
  });

  $.watch(['app/images/**/*'], reload);
  $.watch(['./bower.json'], ['bower-inject', reload]);
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
 * inject bower dependencies to index.html
 */
gulp.task('bower-inject', function () {
  gulp.src('app/index.html')
    .pipe(wiredep({
      exclude: [ /ionic\.css/ ], //exclude ionic.css as we use sass
    }))
    .pipe(gulp.dest('app/'));
});

/*
 * js-inject
 * inject project js files to index.html
 */
gulp.task('js-inject', function () {
  var js = gulp.src(['app/js/**/*.js']);

  gulp.src('app/index.html')
    .pipe($.inject(js, { ignorePath: '/app', addRootSlash: false }))
    .pipe(gulp.dest('app/'));
});

/*
 * clean
 */
gulp.task('clean', function() {
  return gulp.src(['www', '.tmp'], { read: false })
    .pipe($.rimraf());
});
