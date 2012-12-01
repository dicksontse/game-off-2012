$(document).ready(function() {
  var snake = function() {
    var canvas = $("#canvas")[0];
    var w = canvas.width();
    var h = canvas.height();
    var draw = canvas.getContext('2d');

    function tick() {
      draw.clearRect(0, 0, w, h);

      setTimeout(function() { tick() }, 100);
    }

    return {
      init: function() {
        tick();
      }
    }
  };

  snake.init();
});
