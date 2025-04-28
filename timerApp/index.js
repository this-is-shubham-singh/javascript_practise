(function () {
  let hour = document.getElementById("hour");
  let minute = document.getElementById("minute");
  let seconds = document.getElementById("seconds");
  let start = document.getElementById("start");
  let reset = document.getElementById("reset");
  let stop = document.getElementById("stop");

  let counterTimer;
  start.addEventListener("click", () => {
    function startTimer() {
      counterTimer = setInterval(() => {
        console.log("interval running");
        timer();
      }, 1000);
    }

    startTimer();
  });

  // why this is working  ?
  // because you are directly updating value in the input itself. not storing anything on local. 
  // when you stop the timer stop because the interval ends 
  // but when you start again the inputs still has values which is extracts and start running again. 

  function timer() {
    if (seconds.value == 0 && minute.value == 0 && hour.value == 0) {
      clearInterval(counterTimer);
      return;
    }

    if (seconds.value != 0) {
      seconds.value = seconds.value - 1;
    } else if (minute.value != 0 && seconds.value == 0) {
      seconds.value = 59;
      minute.value = minute.value - 1;
    } else if (hour.value != 0 && minute.value == 0) {
      hour.value = hour.value - 1;
      minute.value = 59;
      seconds.value = 59;
    }
  }

  stop.addEventListener("click", () => {
    clearInterval(counterTimer);
  });

  reset.addEventListener("click", () => {
    hour.value = 0;
    minute.value = 0;
    seconds.value = 0;
    clearInterval(counterTimer);
  });
})();
