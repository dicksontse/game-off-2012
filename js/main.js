$(document).ready(function() {
  var snake = function() {
    var canvas = $("#canvas");
    var w = canvas.width();
    var h = canvas.height();
    var draw = canvas[0].getContext('2d');
    var unit = 40;
    var position = [0, 0];

    function updatePosition(current) {
      current[0] += unit;
      if (current[0] + unit > w) {
        current[0] = 0;
      }
    }

    function drawSnake(current) {
      draw.fillStyle = "rgb(65, 131, 196)";
      draw.fillRect(current[0], current[1], unit, unit);
    }

    function tick() {
      draw.clearRect(0, 0, w, h);

      updatePosition(position);
      drawSnake(position);

      setTimeout(function() { tick() }, 100);
    }

    return {
      init: function() {
        tick();
      }
    }
  } ();

  snake.init();
});
