define(['weightedQuickUnion'], function(WeightedQuickUnion) {
  var Percolation = Class.extend({
    init: function(n) {
      this.n = n;

      this.VIRTUAL_TOP = 0;
      this.VIRTUAL_BOTTOM = Math.pow(n, 2) + 1;

      this.wqu = new WeightedQuickUnion(this.VIRTUAL_BOTTOM + 1);
      this.backwash = new WeightedQuickUnion(this.VIRTUAL_BOTTOM);

      this.grid = Array();

      var size = Math.pow(n, 2)
      while(size--) this.grid[size] = false;
    },

    open: function(i, j) {
      var p = this.pointFromCoordinates(i, j);

      this.grid[p - 1] = true;

      // top neighbor
      if (i == 1) {
        this.wqu.union(p, this.VIRTUAL_TOP);
        this.backwash.union(p, this.VIRTUAL_TOP);
      } else {
        var k = i - 1;
        if (this.isOpen(k, j)) {
          var q = this.pointFromCoordinates(k, j);
          this.wqu.union(p, q);
          this.backwash.union(p, q);
        }
      }

      // right neighbor
      if (!(j == this.n)) {
        var k = j + 1;
        if (this.isOpen(i, k)) {
          var q = this.pointFromCoordinates(i, k);
          this.wqu.union(p, q);
          this.backwash.union(p, q);
        }
      }

      // bottom neighbor
      if (i == this.n) {
        this.wqu.union(p, this.VIRTUAL_BOTTOM);
      } else {
        var k = i + 1;
        if (this.isOpen(k, j)) {
          var q = this.pointFromCoordinates(k, j);
          this.wqu.union(p, q);
          this.backwash.union(p, q);
        }
      }

      // left neighbor
      if (!(j == 1)) {
        var k = j - 1;
        if (this.isOpen(i, k)) {
          var q = this.pointFromCoordinates(i, k);
          this.wqu.union(p, q);
          this.backwash.union(p, q);
        }
      }
    },

    isOpen: function(i, j) {
      var p = this.pointFromCoordinates(i, j);

      return this.grid[p - 1];
    },

    isFull: function(i, j) {
      if (!this.isOpen(i, j)) {
        return false;
      }

      var p = this.pointFromCoordinates(i, j);

      return this.backwash.connected(p, this.VIRTUAL_TOP);
    },

    pointFromCoordinates: function(i, j) {
      return (this.n * (i - 1) + j);
    },

    percolates: function() {
      return this.wqu.connected(this.VIRTUAL_TOP, this.VIRTUAL_BOTTOM);
    }
  });

  return Percolation;
});