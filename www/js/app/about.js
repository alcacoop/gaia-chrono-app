define(function (require) {
  var $ = require("jquery");

  $("#about-menu-item").live("click", function () {
    var region_el = $("[role=region]");    
    region_el.attr("data-state", "none");
  });

  $("#about").live("click", function () {
    if (window.location.hash = "#about") {
      window.location.hash = "";
    } 
  });

  $("#app_version").html(require("app/version").app_version);
});