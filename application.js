// ---------------- timer functionality ----------------

// reset timer to 10 seconds
var resetTimer = function() {
  $('.timer-display').html('10:00');
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
      timerLoop();
    } else {
      console.log('times up!');
      clearInterval(interval);
    }
  }, 10);
}

countdown();
