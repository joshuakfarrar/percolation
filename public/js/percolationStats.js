define(['percolation'], function(Percolation) {
  var PercolationStats = Class.extend({
    init: function(n, t) {
      this.n = n;
      this.t = t;

      for (var i = 0; i < t; i++) {
        this.runPercolationExperiment();
      }
    },

    runPercolationExperiment: function() {
      var self = this;

      this.percolation = new Percolation(this.n);

      var steps = 0;

      var wait = setInterval(function() {
        if (!self.percolation.percolates()) {
          var i = Math.floor(Math.random() * self.n) + 1;
          var j = Math.floor(Math.random() * self.n) + 1;

          console.log(i, j);

          self.percolation.open(i, j);
          steps++;
        } else {
          clearInterval(wait);
          alert('percolated in ' + steps + ' steps!');
        }
      }, 100);
    }
  });

  return PercolationStats;
});