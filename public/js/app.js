define(['percolationStats', 'renderer'], function(PercolationStats, Renderer) {
  var App = Class.extend({
    init: function() {
      this.hasNeverStarted = true;
      this.started = false;

      this.n = 40;
    },

    setup: function(canvas) {
      this.setRenderer(new Renderer(this, canvas));
    },

    setRenderer: function(renderer) {
      this.renderer = renderer;
    },

    run: function() {
      this.setExperiment(new PercolationStats(this.n, 1));

      this.started = true;
      this.tick();
      this.hasNeverStarted = false;
    },

    setExperiment: function(experiment) {
      this.experiment = experiment;
    },

    tick: function() {
      this.currentTime = new Date().getTime();

      if (this.started) {
        this.renderer.renderFrame();
      }

      if(!this.isStopped) {
        requestAnimFrame(this.tick.bind(this));
      }
    }
  });

  return App;
});