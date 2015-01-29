define(function() {
  var Renderer = Class.extend({
    init: function(app, canvas) {
      this.app = app;

      this.canvas = canvas;

      this.context = (canvas && canvas.getContext) ? canvas.getContext("2d") : null;
    },

    renderFrame: function() {
      this.clear();
      this.drawPercolation();
    },

    drawPercolation: function() {
      var percolation = this.app.experiment.percolation;

      // n(2)! lame.
      for (var i = 1; i <= percolation.n; i++) {
        for (var j = 1; j <= percolation.n; j++) {
          if (percolation.isOpen(i, j)) {
            this.emptyRect(i, j);
          } else {
            this.filledRect(i, j);
          }
        }
      }
    },

    emptyRect: function(i, j) {
      if (this.app.experiment.percolation.isFull(i, j)) {
        this.drawRect(i, j, '#50b4a2');
      } else {
        this.drawRect(i, j, '#ffffff');
      }
    },

    filledRect: function(i, j) {
      this.drawRect(i, j, '#20201f');
    },

    drawRect: function(i, j, color) {
      this.context.save();
        this.context.fillStyle = color;

        var width = this.context.canvas.width / this.app.n;
        var height = this.context.canvas.height / this.app.n;

        var a = (j - 1) * width,
            b = (i - 1) * height,
            c = j * width,
            d = i * height;

        this.context.fillRect(a, b, c, d);
      this.context.restore();
    },

    clear: function() {
      this.context.save();
        this.context.fillStyle = "#000000";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.restore();
    }
  });

  return Renderer;
});