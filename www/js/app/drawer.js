define(function (require) {
  var $ = require("jquery");

  $("#open-drawer").live("click", function () {
    console.log("DEBUG", $("[role=region]"));
    var region_el = $("[role=region]");    
    var region_state= region_el.attr("data-state");

    region_state = (region_state == "drawer") ? "none" : "drawer";
    region_el.attr("data-state", region_state);
  });

  var delete_button_handler = undefined;

  $('[role="application"] nav .inner ul li a').live("click", function () {
    var region_el = $("[role=region]");    
    region_el.attr("data-state", "none");
  });

  $("#delete-laps-history").live("click", function () {
    delete_button_handler();
  });

  return {
    setDeleteButtonHandler: function (handler) {
      delete_button_handler = handler;
    }
  }
});