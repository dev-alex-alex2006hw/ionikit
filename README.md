# ionikit

Ionic starter kit. with boosters :boom:

Develop and build production ready Ionic applications in no time.

## What you get ?

* sample application structure with walkthrough introduction, signin page, and CRUD pages with sidemenu
* live testing with autoreload from anywhere (desktop + mobile)
* automatic css and js import to index.html ✓
* custom Ionic theme with sass √
* icons and splashscreen generation with the correct names and sizes √
* splashscreen hiding when app is fully ready √
* google analytics integration for tracking errors and views
* cordova plugin versioning and installation √
* js and css assets optimisation
* html and angular templates optimisation
* unit test integration with Karma √

## End result

## How to use - web

Install dependencies:

```
npm install -g gulp cordova ionic bower
npm install && bower install
```

Also make sure you have imagemagick
```
brew install imagemagick
```

Then execute `gulp`. The browser auto refresh on file change.

## How to use - mobile

```
# first make sure to change project id and name in config.xml

# generate android and ios projects
./platforms_install.sh

# generate application icon and splashscreen
gulp resources

# copy project files to platforms
gulp prepare

# to start ios
cordova run ios

# to start android
cordova run android

```
