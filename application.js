// ---------------- timer functionality ----------------

// reset timer to 10 seconds
var resetTimer = function() {
  updateTimerText(10,0);
}

// count down to 0
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



$(document).ready(function() {
  countdown();
});
