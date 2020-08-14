// ---------------- timer functionality ----------------

// reset timer to 10 seconds
var resetTimer = function() {
  updateTimerText(10,0);
}

// null --> null
var countdown = function() {
  var seconds = 0;
  var milliseconds = 0;
  var maxTime = 10000
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

// int --> int
var randomInt = function(max) {
  return _.sample(_.range(max));
}

// int, int, str --> null
var updateProblemText = function(x, y, operator) {
  $('.x-side').html(x);
  $('.y-side').html(y);
  $('.operator').html(operator);
}

//  --------- trigger upon DOM loading ----------------
$(document).ready(function() {
  // countdown();
  // console.log(newProblem());
  updateProblemText(randomInt(100), randomInt(100), '+');
});
