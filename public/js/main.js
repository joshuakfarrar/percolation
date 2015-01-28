define(['jquery', 'app'], function($, App) {
  var initApp = function() {
    $(document).ready(function() {
      var canvas = document.getElementById("canvas");

      var app = new App();
      app.setup(canvas);
      app.run();
    });
  }

  initApp();
});