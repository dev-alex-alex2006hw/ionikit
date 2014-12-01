'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

/*
 * copy-www
 * copy project files to www folder
*/
gulp.task('copy-www', ['images', 'bower-copy'], function () {
  return gulp.src([
      'app/**/*',
      '!app/bower_components/**/*',
      '!app/styles/**/*',
      '!app/resources/**/*',
      '!app/images/**/*'],
    { dot: true })
    .pipe(gulp.dest('www'))
    .pipe($.size({title: 'copy-www'}));
});


/*
 * images
 * optimize images
 */
gulp.task('images', function () {
  return gulp.src('app/images/**/*')
  // .pipe($.cache($.imagemin({progressive: false})))
  .pipe(gulp.dest('www/images'))
  .pipe($.size({title: 'images'}));
});


/*
 * bower-copy
 * copy only required files from bower_components
 */
gulp.task('bower-copy', function() {
  var useref = require('node-useref'),
      fs = require('fs'),
      result = useref(fs.readFileSync('app/index.html', {encoding: 'utf8'})),
      assets = [];

  function push(path) {
    if(/bower_components/.test(path)) {
      assets.push('app/' + path);
    }
  }

  for(var name in result[1].css) {
    result[1].css[name].assets.forEach(push);
  }

  for(name in result[1].js) {
    result[1].js[name].assets.forEach(push);
  }

  return gulp.src(assets, {base: 'app'})
          .pipe(gulp.dest('www'))
          .pipe($.size({title: 'bower_components'}));
});
