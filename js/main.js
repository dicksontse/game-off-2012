$(document).ready(function() {
  var snake = function() {
    var canvas = $("#canvas");
    var w = canvas.width();
    var h = canvas.height();
    var draw = canvas[0].getContext('2d');
    var unit = 40;
    var position = [0, 0];
    var tock = true;

    // Directions: up, down, left, right
    var direction = 'right';

    // Keycodes: [w, up arrow], [a, left arrow], [s, down arrow], [d, right arrow]
    var keys = [ [87, 38], [37, 65], [40, 83], [39, 68] ];

    function updatePosition(current) {
      if (direction == 'up') {
        current[1] -= unit;
      }
      else if (direction == 'down') {
        current[1] += unit;
      }
      else if (direction == 'left') {
        current[0] -= unit;
      }
      else if (direction == 'right') {
        current[0] += unit;
      }

      // Reset position if snake has hit an edge
      if (current[0] < 0) {
        current[0] = w - unit;
      }
      else if (current[0] + unit > w) {
        current[0] = 0;
      }

      if (current[1] < 0) {
        current[1] = h - unit;
      }
      else if (current[1] + unit > h) {
        current[1] = 0;
      }
    }

    function drawSnake(current) {
      draw.fillStyle = "rgb(65, 131, 196)";
      draw.fillRect(current[0], current[1], unit, unit);
    }

    function changeDirection(e) {
      for (i = 0; i < keys.length; i++) {
        if (e.which == keys[i][0] || e.which == keys[i][1]) {
          e.preventDefault();
        }
      }

      if (tock) {
        if (e.which == keys[0][0] || e.which == keys[0][1]) {
          direction = 'up';
        }
        else if (e.which == keys[1][0] || e.which == keys[1][1]) {
          direction = 'left';
        }
        else if (e.which == keys[2][0] || e.which == keys[2][1]) {
          direction = 'down';
        }
        else if (e.which == keys[3][0] || e.which == keys[3][1]) {
          direction = 'right';
        }

        tock = false;
      }
    }

    function tick() {
      draw.clearRect(0, 0, w, h);
      tock = true;

      $(document).keydown(function(e) {
        changeDirection(e);
      });

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
