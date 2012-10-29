// Firefox For Android: force redraw workaround
define(function (require) {
  (function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
  })();

  var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  var is_android = navigator.userAgent.toLowerCase().indexOf("android") > -1;

  return {
    force_redraw: function (element) {
      if(is_firefox && is_android) {
        rafId = window.requestAnimationFrame(
          function(){
            var n = document.createTextNode(' ');
            element.appendChild(n);
            n.parentNode.removeChild(n)
            window.mozCancelRequestAnimationFrame(rafId);
          }
        );
      }
    }
  }
});