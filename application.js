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

var timer = new Countdown();

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

// Math problem constructor
// str --> bool
function MathProblem(operator, max) {
  var problem = generateProb(max);
  var operator = operator;
  var solution;

  this.printLog = function() {
    console.log(problem);
  }

  updateProblemText(problem, operator);

  this.checkAnswer = function(response) {
    solution = probSolution(problem[0], problem[1], operator, response)
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

// ---------------- event handlers --------------------

$(document).on('keypress', 'input', function() {
  if (event.which === 13) {

  }
});

$(document).on('click', 'button', function() {
  // console.log(timer.maxTime);
  timer.addSecond();
})

// ------------ Main Game Loop ------------------------

// array [int, int], str -->
var gameLoop = function(max, operator) {
  var prob = generateProb(max);
  var solution = probSolution(prob[0], prob[1], operator);
  var inputVal = parseInt($('input').val());

  updateProblemText(prob, operator);

  console.log(solution);
}


// var Timer = new Countdown(10000);

// create new timer object
// input.val()
// mathProblem solution = ?

// value === answer? next problem && plus 1000ms : try again

// event listener for enter key

//  --------- trigger upon DOM loading ----------------
$(document).ready(function() {
  // resetGame();
  timer.toggleOn();
  var Problem = new MathProblem('+', 10);
  Problem.printLog();

  // console.log(newProblem());

  // updateProblemText(generateProb(10), '+');
  // console.log(probSolution(10,5,'*'));
  // gameLoop(10, '+');
});
