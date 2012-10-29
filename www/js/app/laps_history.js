define(function (require) {
  var $ = require("jquery");

  $("#laps-header").live("click", function () {
    if(window.location.hash === "#laps") {
      $("#laps").css("position","absolute");
      window.location.hash = "#";
    } else {
      $("#laps").css("position", "fixed");
      window.location.hash = "#laps";
    }
  });

  var laps_history = []

  return {
    addLapTime: function addLapTime(elapsed_time) {
      var formatted_time = elapsed_time.name.h+":"+
        elapsed_time.name.m+":"+elapsed_time.name.s;

      laps_history.push(formatted_time);

      var laptime_el_a = $('<a>', { href:"#" });
      laptime_el_a.append(
              $('<em>', { class: 'aside' }).html(laps_history.length)
      );
      laptime_el_a.append(
        $('<dl>').append($('<dt>').html(formatted_time))
      );
      var laptime_el = $('<li>').append(laptime_el_a);
                            
      $("#laps ul.laps-list").append(laptime_el);

      $("#laps-header em").html("("+laps_history.length+")");
    },
    clearLapTimes: function clearLapTimes() {
      laps_history = [];
      $("#laps ul").html("");
      $("#laps-header em").html("");
    }
  }
});