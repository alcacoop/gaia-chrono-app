define(function (require) {
  // Load any app-specific modules
  // with a relative require call,
  // like:
  // var util = require('./util');

  require('app/appcache_updates');
  var drawer = require('app/drawer');
  require('app/about');
  require('app/install');
  var chrono = require('app/chrono');
  var lapsHistory = require('app/laps_history');

  chrono.setLapHandler(lapsHistory.addLapTime);
  drawer.setDeleteButtonHandler(lapsHistory.clearLapTimes);
});