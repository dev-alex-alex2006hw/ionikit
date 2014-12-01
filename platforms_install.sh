#!/bin/bash

PLATFORMS=("android" "ios")

PLUGINS="
  org.apache.cordova.device@0.2.12
  org.apache.cordova.console@0.2.11
  org.apache.cordova.network-information@0.2.13
  org.apache.cordova.statusbar@0.1.8
  org.apache.cordova.splashscreen@0.3.4
  https://github.com/driftyco/ionic-plugins-keyboard.git
"

# clean up
rm -R platforms/* 2>/dev/null
rm -R plugins/* 2>/dev/null

# install platforms
ionic platform add ${PLATFORMS[@]}

# install plugins
ionic plugin add ${PLUGINS}
