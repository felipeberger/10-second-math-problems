// ---------------- timer functionality ----------------

// reset timer to 10 seconds
var resetGame = function() {
  updateTimerText(10,0);
  updateProblemText(0, 0, '+');
}

// countdown timer constructor
// int --> null
function Countdown() {
  var maxTime = 10000;
  var seconds = 0;
  var milliseconds = 0;
  var start = new Date(0);
  var running = false;

  this.toggleOn = function() {
    running = true;
    timerLoop();
  }

  this.addSecond = function() {
    maxTime += 1000;
  }

  this.reset = function() {
    running = false;
  }

  this.logTime = function() {
    console.log(maxTime);
  }

  var timerLoop = function() {
    if (running = true) {
      var end = new Date(maxTime);

      seconds = Math.floor((end-start) / 1000);
      milliseconds = Math.floor(((end-start) % 1000) / 10);
      // console.log(seconds + "." + milliseconds);
      maxTime -= 10;
    }
  }

  var interval = setInterval(function() {
    if (maxTime > 0 && running === true) {
      updateTimerText(seconds, milliseconds);
      timerLoop();
    } else {
      updateTimerText(0, 0);
      console.log('times up!');
      clearInterval(interval);
    }
  }, 10);
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
  if (answer) {
    Problem = new MathProblem('+', 10);
    Problem.printProblem();
    $('input').val('');
  } else {
    $('input').val('');
  }
}

// ---------------- event handlers --------------------

$(document).on('keypress', 'input', function() {
  if (event.which === 13) {
    var temp = Problem.checkAnswer();
    gameLoop(temp);
  }
});

$(document).on('click', 'button', function() {
  gameLoop(Problem.checkAnswer());
});

// ------- initialize constructors --------------------

var Timer = new Countdown();

var Problem = new MathProblem('+', 10);

//  --------- trigger upon DOM loading ----------------

$(document).ready(function() {
  Timer.toggleOn();
  Problem.printProblem();
});
