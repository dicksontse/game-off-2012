$(document).ready(function() {
  var snake = function() {
    var canvas = $("#canvas");
    var w = canvas.width();
    var h = canvas.height();
    var draw = canvas[0].getContext('2d');
    var unit = 40;
    var position = [unit, unit];
    var tickSpeed = 100;
    var tock = true;

    // Directions: up, down, left, right
    var direction = 'right';

    // Keycodes: [w, up arrow], [a, left arrow], [s, down arrow], [d, right arrow]
    var keys = [ [87, 38], [37, 65], [40, 83], [39, 68] ];

    var itemExists = false;
    var itemPosition = new Array();

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

      // Game over if snake has hit a wall
      if ((current[0] < 0) || (current[0] + unit > w) || (current[1] < 0) || (current[1] + unit > h)) {
        gameOver();
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

    function itemHandler() {
      if (!itemExists) {
        itemPosition = generateRandomPosition();
        itemExists = true;
      }

      draw.fillStyle = "green";
      draw.fillRect(itemPosition[0], itemPosition[1], unit, unit);

      var snake = [ [position[0], position[0] + unit], [position[1], position[1] + unit] ];
      var item = [ [itemPosition[0], itemPosition[0] + unit], [itemPosition[1], itemPosition[1] + unit] ];

      var hitX = hitCheck(snake[0], item[0]);
      var hitY = hitCheck(snake[1], item[1]);

      var hit = hitX && hitY;

      if (hit) {
        // Clear item from canvas
        draw.clearRect(item[0], item[1], unit, unit);
        itemExists = false;

        // Replace with the snake
        draw.fillStyle = "rgb(65, 131, 196)";
        draw.fillRect(item[0], item[1], unit, unit);

        if (tickSpeed > 30) {
          tickSpeed -= 5;
        }
      }
    }

    function generateRandomPosition() {
      var x = Math.round(Math.floor(Math.random() * (w - (unit - 1))) / unit) * unit;
      var y = Math.round(Math.floor(Math.random() * (w - (unit - 1))) / unit) * unit;

      return [x, y];
    }

    function hitCheck(myPosition, itemPosition) {
      var a = itemPosition;
      var b = myPosition;

      if (myPosition[0] < itemPosition[0]) {
        a = myPosition;
      }
      
      if (myPosition[1] < itemPosition[0]) {
        b = itemPosition;
      }

      if (a[1] > b[0] || a[0] === b[0]) {
        return true;
      }
      else {
        return false;
      }
    }

    function gameOver() {
      alert("Game Over");

      tickSpeed = 100;
      direction = 'right';
      position = [unit, unit];
    }

    function tick() {
      draw.clearRect(0, 0, w, h);
      tock = true;

      $(document).keydown(function(e) {
        changeDirection(e);
      });

      updatePosition(position);
      drawSnake(position);
      itemHandler();

      setTimeout(function() { tick() }, tickSpeed);
    }

    return {
      init: function() {
        tick();
      }
    }
  } ();

  snake.init();
});
