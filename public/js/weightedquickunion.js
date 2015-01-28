define(function() {
  var WeightedQuickUnion = Class.extend({
    init: function(n) {
      this.count = n;

      this.id = Array();
      this.sz = Array();

      for (var i = 0; i < n; i++) {
        this.id[i] = i;
        this.sz[i] = 1;
      }
    },

    count: function() {
      return this.count;
    },

    find: function(p) {
      while (p != this.id[p]) {
        p = this.id[p];
      }
      return p;
    },

    connected: function(p, q) {
      return this.find(p) == this.find(q);
    },

    union: function(p, q) {
      var rootP = this.find(p);
      var rootQ = this.find(q);

      if (rootP == rootQ) return;

      if (this.sz[rootP] < this.sz[rootQ]) {
        this.id[rootP] = rootQ;
        this.sz[rootQ] += this.sz[rootP];
      } else {
        this.id[rootQ] = rootP;
        this.sz[rootP] += this.sz[rootQ];
      }
      this.count--;
    }
  });

  return WeightedQuickUnion;
});