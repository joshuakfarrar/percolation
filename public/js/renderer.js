define(function() {
  var Renderer = Class.extend({
    init: function(canvas) {
      this.canvas = canvas;

      this.context = (canvas && canvas.getContext) ? canvas.getContext("2d") : null;
    },

    renderFrame: function() {
    }
  });

  return Renderer;
});