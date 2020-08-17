// ---------------- timer functionality ----------------

// countdown timer constructor
// int --> null
function Countdown() {
  var maxTime = 10000;
  var seconds = 0;
  var milliseconds = 0;
  var start = new Date(0);
  var end;
  var running = false;
  var score = 0;
  var highScore = 0;
  var interval;

  this.toggleOn = function() {
    if (running === false) {
      running = true;
      this.startTimer();
    }
  }

  this.reset = function() {
    clearInterval(interval);
    this.printHighScore();
    maxTime = 10000;
    seconds = 0;
    milliseconds = 0;
    running = false;
    score = 0;
    this.printScore();
    updateTimerText(10, 00);
  }

  this.isRunning = function() {
    return running;
  }

  this.printScore = function() {
    $('.score-display').html(score);
  }

  this.printHighScore = function() {
    highScore = score > highScore ? score : highScore;
    $('.highscore-display').html(highScore);
  }

  this.addSecond = function() {
    if (running) {
      maxTime += 1000;
      score += 1;
      this.printScore();
    }
  }

  var timerLoop = function() {
    if (running = true) {
      end = new Date(maxTime);

      seconds = Math.floor((end-start) / 1000);
      milliseconds = Math.floor(((end-start) % 1000) / 10);
      maxTime -= 10;
    }
  }

  this.startTimer = function() {
    interval = setInterval(function() {
      if (maxTime > 0 && running === true) {
        updateTimerText(seconds, milliseconds);
        timerLoop();
      } else {
        running = false;
        updateTimerText(0, 0);
        clearInterval(interval);
      }
    }, 10);
  }
};

// ----------- math problem functionality -------------

// max = top range, exclusive
// int --> array [int, int]
var generateProb = function(max) {
  var problem = [_.sample(_.range(1, max)), _.sample(_.range(1, max))];

  problem = (problem[0] < problem[1]) ? [problem[1], problem[0]] : [problem[0], problem[1]];

  return problem;
}

// int, int, str, int --> bool
var probSolution = function(x, y, operator, response) {
  var solution;
  var correct;

  switch (operator) {
    case '+':
      solution = x + y;
      break;
    case '-':
      solution = x - y;
      break;
    case '*':
      solution = x * y;
      break;
    case '/':
      solution = x / y;
      break;
  }

  correct = solution === response;

  return correct;
}

// str --> int
var getInput = function() {
  var temp = parseInt($('input').val());
  return temp;
}

// Math problem constructor
// str, int
function MathProblem(operator, max) {
  var problem = generateProb(max);
  var operator = operator;
  var solution;

  this.printProblem = function() {
    updateProblemText(problem, operator);
  }

  // null --> bool
  this.checkAnswer = function() {
    solution = probSolution(problem[0], problem[1], operator, getInput());
    return solution;
  }
};

// ------------- DOM update functionality -------------

// int, int --> null
var updateTimerText = function(secs, ms) {
  var updatedSecs;
  var updatedMs;

  if (secs < 10) {
    updatedSecs = '0' + secs.toString();
  } else {
    updatedSecs = secs;
  }

  if (ms < 10) {
    updatedMs = '0' + ms.toString();
  } else {
    updatedMs = ms;
  }

  $('.seconds').html(updatedSecs);
  $('.milliseconds').html(updatedMs);
}

// array [int, int], str --> null
var updateProblemText = function(arr, operator) {
  $('.x-side').html(arr[0]);
  $('.y-side').html(arr[1]);
  $('.operator').html(operator);
}

// ------------ Game Loop ------------------------

// bool --> null
var gameLoop = function (answer) {
  if (answer && Timer.isRunning()) {
    Problem = new MathProblem('+', 10);
    Problem.printProblem();
    Timer.addSecond();
    $('input').val('');
  } else {
    $('input').val('');
  }
}

// ---------------- event handlers --------------------

// submits answer if enter, otherwise starts the game
$(document).on('keypress', 'input', function() {
  if (event.which === 13) {
    var temp = Problem.checkAnswer();
    gameLoop(temp);
  } else {
    Timer.toggleOn();
  }
});

// Starts timer
$(document).on('click', 'button[name="start"]', function() {
  Timer.toggleOn();
});

// Resets game
$(document).on('click', 'button[name="new-game"]', function() {
  Timer.reset();
  Problem = new MathProblem('+', 10);
  Problem.printProblem();
});

// ------- initialize constructors --------------------

var Timer = new Countdown();

var Problem = new MathProblem('+', 10);

//  --------- trigger upon DOM loading ----------------

$(document).ready(function() {
  Timer.printScore();
  Problem.printProblem();
  updateTimerText(10, 00);
});
