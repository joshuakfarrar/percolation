define(['percolationStats', 'renderer', 'updater'], function(PercolationStats, Renderer, Updater) {
  var App = Class.extend({
    init: function() {
      this.hasNeverStarted = true;
      this.started = false;

      this.n = 5;
    },

    setup: function(canvas) {
      this.setRenderer(new Renderer(this, canvas));
    },

    setRenderer: function(renderer) {
      this.renderer = renderer;
    },

    run: function() {
      this.setUpdater(new Updater(this));

      this.setExperiment(new PercolationStats(this.n, 1));

      this.started = true;
      this.tick();
      this.hasNeverStarted = false;
    },

    setUpdater: function(updater) {
      this.updater = updater;
    },

    setExperiment: function(experiment) {
      this.experiment = experiment;
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