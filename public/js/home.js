require.config({
    paths: {
        jquery: 'lib/jquery-2.1.3.min'
    }
});

define(['lib/class', 'lib/underscore-min', 'util'], function() {
  require(["main"]);
});