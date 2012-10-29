define(function (require) {
  var force_redraw = require('app/force_redraw_workaround').force_redraw;
  var $ = require("jquery");

  for (var i=0; i<60; i++) {
    var txt = i < 10 ? "0"+i : i;
    var el = $("<li>", {role: "option", class: txt}).html(txt);
    $("#seconds").append(el);
  }

  for (var i=0; i<60; i++) {
    var txt = i < 10 ? "0"+i : i;
    var el = $("<li>", {role: "option", class: txt}).html(txt);
    $("#minutes").append(el);
  }

  for (var i=0; i<100; i++) {
    var txt = i < 10 ? "0"+i : i;
    var el = $("<li>", {role: "option", class: txt}).html(txt);
    $("#hours").append(el);
  }

  var current_timer = undefined;
  var start = undefined;
  var lapButtonHandler = undefined;
  var last_elapsed_time = 0;

  $("#reset_lap").live("click", function () {
    if (typeof current_timer == "undefined") {
      start = undefined;
      last_elapsed_time = 0;
      scroll($("#seconds > li.00"), $("#seconds"), 0);
      scroll($("#minutes > li.00"), $("#minutes"), 0);
      scroll($("#hours > li.00"), $("#hours"), 0);    
    } else {
      var elapsed_delta = Math.floor(Date.now() - start);
      var elapsed_time = secondsToTime((last_elapsed_time + elapsed_delta)/1000);

      lapButtonHandler(elapsed_time);
    }
  });

  $("#start_stop").live("click", function timer() {
    if (typeof start == "undefined") {
      start = Date.now();
    }

    if (current_timer) {
      $("#start_stop").html("Start");
      $("#reset_lap").html("Reset");
      // STOP
      clearInterval(current_timer);
      last_elapsed_time += (Date.now() - start);
      current_timer = undefined;
      start = undefined;
    } else {
      // START
      $("#start_stop").html("Stop");
      $("#reset_lap").html("Lap");

      current_timer = setInterval(function () {
        var elapsed_delta = Math.floor(Date.now() - start);
        var elapsed_time = secondsToTime((last_elapsed_time + elapsed_delta)/1000);

        scroll($("#seconds > li."+elapsed_time.name.s), $("#seconds"), elapsed_time.val.s);
        scroll($("#minutes > li."+elapsed_time.name.m), $("#minutes"), elapsed_time.val.m);
        scroll($("#hours > li."+elapsed_time.name.h), $("#hours"), elapsed_time.val.h);
      }, 500);
    }
  });

  return {
    setLapHandler: function (handler) {
      lapButtonHandler = handler;
    }
  }


  function scroll(element, parent, val){
    var pos = $(element).get(0).clientHeight * val;
    $(parent).animate({ scrollTop: pos }, 
                      { duration: "0.3s", easing: 'swing',
                        step: function() {
                          force_redraw(element.get(0));
                        }
                      });    
  }
  
  // based on http://stackoverflow.com/questions/6312993/javascript-seconds-to-time-with-format-hhmmss
  function secondsToTime(secs) {
    var hours = Math.floor(secs / (60 * 60));
    
    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);
    
    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);
    
    var obj = {
      val: {
        "h": hours, // < 10 ? "0"+hours : hours,
        "m": minutes, // < 10 ? "0"+minutes : minutes,
        "s": seconds // < 10 ? "0"+seconds : seconds
      },
      name: {
        "h": hours < 10 ? "0"+hours : hours,
        "m": minutes < 10 ? "0"+minutes : minutes,
        "s": seconds < 10 ? "0"+seconds : seconds
      }
    };
    return obj;
  }
});