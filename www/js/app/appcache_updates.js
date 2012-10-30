define(function (request) {
  var $ = require("jquery");

  $(function() {
    $('.upgrade-btn').click(upgrade);
  });

  function upgrade() {
    window.applicationCache.update();
    window.location.reload();
  }

  if (window.applicationCache) {
    window.applicationCache.update();
    window.applicationCache.onupdateready = function(e) {
      if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
        // Browser downloaded a new app cache.
        // Swap it in and reload the page to get the new hotness.
        window.applicationCache.swapCache();
        window.location.reload();
      } else {
        // Manifest didn't changed. Nothing new to server.
      }
    };
  }
});