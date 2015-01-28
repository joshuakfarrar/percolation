define(['renderer', 'updater'], function(Renderer, Updater) {
  var App = Class.extend({
    init: function() {
      this.hasNeverStarted = true;
      this.started = false;
    },

    setup: function(canvas) {
      this.setRenderer(new Renderer(canvas));
    },

    setRenderer: function(renderer) {
      this.renderer = renderer;
    },

    run: function() {
      this.setUpdater(new Updater(this));
      this.started = true;
      this.tick();
      this.hasNeverStarted = false;
    },

    setUpdater: function(updater) {
      this.updater = updater;
    },

    tick: function() {
      this.currentTime = new Date().getTime();

      if (this.started) {
        this.updater.update();
        this.renderer.renderFrame();
      }

      if(!this.isStopped) {
        requestAnimFrame(this.tick.bind(this));
      }
    }
  });

  return App;
});