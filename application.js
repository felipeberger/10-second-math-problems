// ---------------- timer functionality ----------------

// reset timer to 10 seconds
var resetTimer = function() {
  updateTimerText(10,0);
}

// int --> null
function Countdown(maxTime) {
  this.maxTime = maxTime;
  var seconds = 0;
  var milliseconds = 0;
  var start = new Date(0);

  var timerLoop = function() {
    var end = new Date(maxTime);

    seconds = Math.floor((end-start) / 1000);
    milliseconds = Math.floor(((end-start) % 1000) / 10);
    console.log(seconds + "." + milliseconds);
    maxTime -= 10;
  }

  var interval = setInterval(function() {
    if (maxTime > 0) {
      updateTimerText(seconds, milliseconds);
      timerLoop();
    } else {
      updateTimerText(0, 0);
      console.log('times up!');
      clearInterval(interval);
    }
  }, 10);
};

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

// ----------- math problem functionality -------------

// max = top range, exclusive
// int --> array [int, int]
var generateProb = function(max) {
  var problem = [_.sample(_.range(1, max)), _.sample(_.range(1, max))];

  problem = (problem[0] < problem[1]) ? [problem[1], problem[0]] : [problem[0], problem[1]]

  return problem;
}

// int, int, str --> null
var updateProblemText = function(x, y, operator) {
  $('.x-side').html(x);
  $('.y-side').html(y);
  $('.operator').html(operator);
}

// int, int, str --> int
var probSolution = function(x, y, operator) {
  var solution;

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

  return solution;
}

// ------------ Main Game Loop ------------------------

// input.val()
// mathProblem solution = ?
// event listener for enter key
// value === answer? next problem && plus 1000ms : try again


//  --------- trigger upon DOM loading ----------------
$(document).ready(function() {
  // var timer = new Countdown(10000);
  // console.log(newProblem());
  // updateProblemText(randomInt(100), randomInt(100), '+');
  // console.log(probSolution(10,5,'*'));
});
