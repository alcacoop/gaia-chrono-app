define(function (require) {
  var $ = require("jquery");

  // Hook up the installation button, feel free to customize how
  // this works

  var install = require('install');
  
  function updateInstallButton() {
    $(function() {
      var btn = $('.install-btn');
      if(install.state == 'uninstalled') {
        btn.show();
      }
      else if(install.state == 'installed' || install.state == 'unsupported') {
        btn.hide();
      }
    });
  }

  $(function() {
    $('.install-btn').click(install);        
  });
  
  install.on('change', updateInstallButton);
  
  install.on('error', function(e, err) {
    // Feel free to customize this
    $('.install-error').text(err.toString()).show();
  });
  
  install.on('showiOSInstall', function() {
    // Feel free to customize this
    var msg = $('.install-ios-msg');
    msg.show();
    
    setTimeout(function() {
      msg.hide();
    }, 8000);
  });
});