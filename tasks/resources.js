'use strict';

var gulp = require('gulp'),
    fs = require('fs'),
    shell = require('shelljs');

function projectName(callback) {
  var xml2js = require('xml2js'),
      path = require('path');

  var configPath = path.resolve('config.xml'),
  config = fs.readFileSync(configPath, { encoding: 'utf8' });

  xml2js.parseString(config, function(err, cordovaConfig) {
    callback(cordovaConfig.widget.name[0]);
  });
}

function generateAndroidIcons(projectName, platformPath, callback) {
  var icon = 'app/resources/icon.png',
      fullPath = platformPath + 'res',
      cmd = ['convert', icon,
      '\\( +clone -resize x36 -write ' + fullPath + '/drawable-ldpi/icon.png +delete \\)',
      '\\( +clone -resize x48 -write ' + fullPath + '/drawable-mdpi/icon.png +delete \\)',
      '\\( +clone -resize x72 -write ' + fullPath + '/drawable-hdpi/icon.png +delete \\)',
      '\\( +clone -resize x96 -write ' + fullPath + '/drawable/icon.png +delete \\)',
      '\\( +clone -resize x96 -write ' + fullPath + '/drawable-xhdpi/icon.png +delete \\)',
      '-resize x144 ' + fullPath + '/drawable-xhdpi/icon.png',
      ].join(' ');

  shell.exec(cmd, function(code, output) {
    if(output) { console.log(output); }
    callback();
  });
}

function generateIosIcons(projectName, platformPath, callback) {
    var icon = 'app/resources/icon.png',
    fullPath = platformPath + projectName + '/Resources/icons',
    cmd = ['convert', icon,
    '\\( +clone -resize x29 -write ' + fullPath + '/icon-small.png +delete \\)',
    '\\( +clone -resize x58 -write ' + fullPath + '/icon-small@2x.png +delete \\)',
    '\\( +clone -resize x57 -write ' + fullPath + '/icon.png +delete \\)',
    '\\( +clone -resize x114 -write ' + fullPath + '/icon@2x.png +delete \\)',
    '\\( +clone -resize x40 -write ' + fullPath + '/icon-40.png +delete \\)',
    '\\( +clone -resize x80 -write ' + fullPath + '/icon-40@2x.png +delete \\)',
    '\\( +clone -resize x50 -write ' + fullPath + '/icon-50.png +delete \\)',
    '\\( +clone -resize x100 -write ' + fullPath + '/icon-50@2x.png +delete \\)',
    '\\( +clone -resize x60 -write ' + fullPath + '/icon-60.png +delete \\)',
    '\\( +clone -resize x120 -write ' + fullPath + '/icon-60@2x.png +delete \\)',
    '\\( +clone -resize x72 -write ' + fullPath + '/icon-72.png +delete \\)',
    '\\( +clone -resize x144 -write ' + fullPath + '/icon-72@2x.png +delete \\)',
    '\\( +clone -resize x76 -write ' + fullPath + '/icon-76.png +delete \\)',
    '\\( +clone -resize x152 -write ' + fullPath + '/icon-76@2x.png +delete \\)',
    '\\( +clone -resize x512 -write ' + fullPath + '/iTunesArtwork.png +delete \\)',
    '-resize x512 ' + fullPath + '/iTunesArtwork@2x.png',
    ].join(' ');

  shell.exec(cmd, function(code, output) {
    if(output) { console.log(output); }
    callback();
  });
}

function generateIosSplash(projectName, platformPath, callback) {
  var icon = 'app/resources/splashscreen.png',
      fullPath = platformPath + projectName + '/Resources/splash',
      cmd = ['convert', icon,
      '\\( +clone -resize 640x1136\\^ -gravity center -crop 640x1136+0+0 -write ' + fullPath + '/Default-568h@2x~iphone.png +delete \\)',
      '\\( +clone -resize 1546x2048\\^ -gravity center -crop 1546x2048+0+0 -write ' + fullPath + '/Default-Portrait@2x~ipad.png +delete \\)',
      '\\( +clone -resize 768x1024\\^ -gravity center -crop 768x1024+0+0 -write ' + fullPath + '/Default-Portrait~ipad.png +delete \\)',
      '\\( +clone -resize 640x960\\^ -gravity center -crop 640x960+0+0 -write ' + fullPath + '/Default@2x~iphone.png +delete \\)',
      '-resize 320x480\\^ -gravity center -crop 320x480+0+0 ' + fullPath + '/Default~iphone.png',
      ].join(' ');

  shell.exec(cmd, function(code, output) {
    if(output) { console.log(output); }
    callback();
  });
}

function generateAndroidSplash(projectName, platformPath, callback) {
  var icon = 'app/resources/splashscreen.png',
      fullPath = platformPath + 'res',
      cmd = ['convert', icon,
      '\\( +clone -resize 200x320\\^ -gravity center -crop 200x320+0+0 -write ' + fullPath + '/drawable-port-ldpi/screen.png +delete \\)',
      '\\( +clone -resize 400x800\\^ -gravity center -crop 400x800+0+0 -write ' + fullPath + '/drawable-port-hdpi/screen.png +delete \\)',
      '\\( +clone -resize 320x480\\^ -gravity center -crop 320x480+0+0 -write ' + fullPath + '/drawable-port-mdpi/screen.png +delete \\)',
      '-resize 720x1280\\^ -gravity center -crop 720x1280+0+0 ' + fullPath + '/drawable-port-xhdpi/screen.png',
      ].join(' ');

  shell.exec(cmd, function(code, output) {
    if(output) { console.log(output); }
    callback();
  });
}

/*
 * resources
 * generate icons and splashscreens set
 */
gulp.task('resources', function(done) {

  var platformPath = 'platforms',
      numPlatforms = 0;

  projectName(function(name) {

    if(fs.existsSync(platformPath + '/ios')) {
      numPlatforms += 2;
      generateIosIcons(name, platformPath + '/ios/', function() {
        if(--numPlatforms === 0) { done(); }
      });

      generateIosSplash(name, platformPath + '/ios/', function() {
        if(--numPlatforms === 0) { done(); }
      });
    }

    if(fs.existsSync(platformPath + '/android')) {
      numPlatforms += 2;
      generateAndroidIcons(name, platformPath + '/android/', function() {
        if(--numPlatforms === 0) { done(); }
      });

      generateAndroidSplash(name, platformPath + '/android/', function() {
        if(--numPlatforms === 0) { done(); }
      });
    }
  });
});
