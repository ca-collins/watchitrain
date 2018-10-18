  //for timer
  var time = 0;
  var offset;
  var interval;

  // for money counter
  var payAmount;
  var moneyPerMillisecond;
  var amountEarned = 0;
  var hoursPerWeek;

  var countBy = 2;
  var tenthsRadio = document.querySelector("#tenths-radio");
  var centsRadio = document.querySelector("#cents-radio");
  var dollarsRadio = document.querySelector("#dollars-radio");
  var countByWrapper = document.querySelector(".count-by-wrapper");
  var tenthsSpan =  document.querySelector(".tenths");

function Stopwatch(timer, counter) {



  function update() {
    if (this.isOn) {
      
      // for timer
      time += delta();
      
      //for money counter
      amountEarned += moneyPerMillisecond;

    }
    // **********************************
    
    // **********************************



    // for timer
    timer.textContent = timeFormatter(time);
    
    //for money counter
    if (tenthsRadio.checked) {
      counter.innerHTML = "<div>$" + moneyFormaterMain(amountEarned) + "<span class='tenths'>" + moneyFormaterTenths(amountEarned) + "</span></div>";
    } else {
      counter.innerHTML = "<div>$" + moneyFormaterMain(amountEarned) + "</div>";
    }
  }

  // for money counter
  function moneyFormaterMain(amount) {
    return amount.toFixed(countBy);
  }

  function moneyFormaterTenths(amount) {
    return amount.toFixed(3).toString().split('').pop();
  }

  countByWrapper.addEventListener("click", function() {
    if (tenthsRadio.checked) {
      countBy = 2;
    } else if (centsRadio.checked) {
      countBy = 2;
    } else {
      countBy = 0;
    }
  })

  //for timer
  function delta() {
    var now = Date.now();
    var timePassed = now - offset;

    offset = now;

    return timePassed;
  }

  // for timer
  function timeFormatter(time) {
    time = new Date(time);

    var minutes = time.getMinutes().toString();
    var seconds = time.getSeconds().toString();
    var milliseconds = time.getMilliseconds().toString();

    if (minutes.length < 2) {
      minutes = '0' + minutes;
    }

    if (seconds.length < 2) {
      seconds = '0' + seconds;
    }

    while (milliseconds.length < 3) {
      milliseconds = '0' + milliseconds;
    }

    return minutes + ' : ' + seconds + ' . ' + milliseconds;
  }
  
  this.start = function() {
    //for timer
    interval = setInterval(update.bind(this), 10);
    offset = Date.now();
    this.isOn = true;


    // for money counter
    payAmount = document.querySelector("#pay-amount").value;
    if (payTypeHourly.checked) {
      moneyPerMillisecond = hourlyPayCalc(payAmount);
    } else if (payTypeYearly.checked) {
        hoursPerWeek = document.querySelector("#hrs-per-wk").value;
        moneyPerMillisecond = yearlyPayCalc(payAmount, hoursPerWeek);
    } 
  };

  function stopTasks() {
    clearInterval(interval);
    interval = null;
    this.isOn = false;
  };

  this.stop = function() {
    stopTasks();
  };

  this.reset = function() {
    stopTasks();
    time = 0;
    amountEarned = 0;
    update();
  };

  this.isOn = false;
};

// calculates money earned per millisecond if salary and weekly hours are provided
function yearlyPayCalc (amount, hours) {
  var hourlyAmount = amount / 52 / hours;
  return hourlyPayCalc(hourlyAmount);
}

function hourlyPayCalc (amount) {
  return amount / 60 / 60 / 100;
}

