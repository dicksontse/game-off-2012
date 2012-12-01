$(document).ready(function() {
  var started = false;

  var game = function() {
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

    var branchExists = false;
    var branchPosition = new Array();

    var mergeExists = false;
    var mergePosition = new Array();

    var score = 0;
    var scoreIncrement = 5;
    var highScore = 0;

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

      // Game over if hero has hit a wall
      if ((current[0] < 0) || (current[0] + unit > w) || (current[1] < 0) || (current[1] + unit > h)) {
        gameOver();
      }
    }

    function drawHero(current) {
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

    function branchHandler() {
      if (!branchExists) {
        branchPosition = generateRandomPosition();
        branchExists = true;
      }

      draw.fillStyle = "green";
      draw.fillRect(branchPosition[0], branchPosition[1], unit, unit);

      var hero = [ [position[0], position[0] + unit], [position[1], position[1] + unit] ];
      var branch = [ [branchPosition[0], branchPosition[0] + unit], [branchPosition[1], branchPosition[1] + unit] ];

      var hitX = hitCheck(hero[0], branch[0]);
      var hitY = hitCheck(hero[1], branch[1]);

      var hit = hitX && hitY;

      if (hit) {
        // Clear branch from canvas
        draw.clearRect(branch[0], branch[1], unit, unit);
        branchExists = false;

        // Replace with the hero
        draw.fillStyle = "rgb(65, 131, 196)";
        draw.fillRect(branch[0], branch[1], unit, unit);

        if (tickSpeed > 30) {
          tickSpeed -= 5;
        }

        updateScore();
      }
    }

    function mergeHandler() {
      if (!mergeExists) {
        mergePosition = generateRandomPosition();
        mergeExists = true;
      }

      draw.fillStyle = "red";
      draw.fillRect(mergePosition[0], mergePosition[1], unit, unit);

      var hero = [ [position[0], position[0] + unit], [position[1], position[1] + unit] ];
      var merge = [ [mergePosition[0], mergePosition[0] + unit], [mergePosition[1], mergePosition[1] + unit] ];

      var hitX = hitCheck(hero[0], merge[0]);
      var hitY = hitCheck(hero[1], merge[1]);

      var hit = hitX && hitY;

      if (hit) {
        // Clear branch from canvas
        draw.clearRect(merge[0], merge[1], unit, unit);
        mergeExists = false;

        // Replace with the hero
        draw.fillStyle = "rgb(65, 131, 196)";
        draw.fillRect(merge[0], merge[1], unit, unit);

        if (tickSpeed > 30) {
          tickSpeed += 3;
        }

        updateScore();
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

    function updateScore() {
      score += scoreIncrement;
      $("span#score").html(score);

      if (score > highScore) {
        highScore = score;
        $("span#high-score").html(highScore);
      }
    }

    function gameOver() {
      alert("Game Over");

      started = false;
      tickSpeed = 100;
      direction = 'right';
      position = [unit, unit];

      score = 0;
      $("span#score").html(score);
    }

    function tick() {
      draw.clearRect(0, 0, w, h);
      tock = true;

      $(document).keydown(function(e) {
        changeDirection(e);
      });

      updatePosition(position);
      drawHero(position);
      branchHandler();
      mergeHandler();

      if (started) {
        setTimeout(function() { tick() }, tickSpeed);
      }
      else {
        draw.clearRect(0, 0, w, h);
      }
    }

    return {
      start: function() {
        tick();
      }
    }
  } ();

  $("button#start").click(function(e) {
    e.preventDefault();
    started = true;
    game.start();
  });
});
