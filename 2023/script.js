// TRANSITIONS -------------
var mainElem = document.querySelector("main");
var initForm = document.querySelector(".init-form");
var settingsMenu = document.querySelector(".settings");
var settingsMenuLine = document.querySelector(".settings-menu-line");
var settingsBtn = document.querySelector("#btn-settings");
var payTypeHourly = document.querySelector("#hourly-radio");
var payTypeYearly = document.querySelector("#yearly-radio");
var hourlyInput = document.getElementsByClassName("hourly-input");
var yearlyInput = document.getElementsByClassName("yearly-input");
var payTypeWrapper = document.querySelector(".pay-type-wrapper");

// init menu

payTypeWrapper.addEventListener("click", function() {
    if (payTypeHourly.checked) {
        hourlyInput[0].classList.toggle("slideInDown");
        hourlyInput[1].classList.toggle("slideInDown");    
    } else if (payTypeYearly.checked) {
        yearlyInput[0].classList.toggle("slideInDown");
        yearlyInput[1].classList.toggle("slideInDown");    
        yearlyInput[2].classList.toggle("slideInDown"); 
        yearlyInput[3].classList.toggle("slideInDown");  
    }
})


// settings menu toggle
function settingsMenuToggle() {
    settingsMenu.classList.toggle("slideScaleIn");
    settingsMenuLine.classList.toggle("slideScaleIn");
}

// scroll bottom (settings menu)
function scrollToggle() {
    if (settingsBtn.checked) {
        document.body.scrollTop = 1000; // For Safari
        document.documentElement.scrollTop = 1000; // For Chrome, Firefox, IE and Opera
    } else {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
}

// main toggle

function inputChecker() {
    hoursPerWeek = document.querySelector("#hrs-per-wk").value;
    payAmount = document.querySelector("#pay-amount").value;
    if (payTypeHourly.checked && payAmount > 0) {
        return true;
    }
    else if (payTypeYearly.checked && payAmount > 0 && hoursPerWeek > 0) {
        return true;
    }
    else {
        return false;
    }
}

function initPlay() {
    if (inputChecker()) {
        mainElem.classList.toggle("slideInDown");
        initForm.classList.toggle("slideOutLeft");
        watch.start();
        startAnimation();
    } else {
        alert("You must complete all fields first!");
    }
};

// LOGIC ------------

var timer = document.querySelector("#timer");
var counter =document.querySelector(".money-counter")

var startBtn = document.querySelector("#btn-start");
var pauseBtn = document.querySelector("#label-pause");
var restartBtn = document.querySelector("#label-restart");

var watch = new Stopwatch(timer, counter);

startBtn.addEventListener('click', initPlay);

pauseBtn.addEventListener('click', function() {
    watch.stop();
    stopAnimation();
});

restartBtn.addEventListener('click', function() {
    watch.reset();
    mainElem.classList.toggle("slideInDown");
    initForm.classList.toggle("slideOutLeft");
    scrollToggle();
    stopAnimation();
});

//changes placeholder text of pay amount input field when hourly or yearly is clicked
document.querySelector('#yearly-label').addEventListener("click", function(){document.querySelector('#pay-amount').placeholder = "$ / yr"});
document.querySelector('#hourly-label').addEventListener("click", function(){document.querySelector('#pay-amount').placeholder = "$ / hr"});


// ANIMATION RELATED
// function removeElement(elementId) {
//     // Removes an element from the document
//     var element = document.getElementById(elementId);
//     element.parentNode.removeChild(element);
// }

// Get the <ul> element with id="myList"
// var list = document.getElementById("myList");

// // If the <ul> element has any child nodes, remove its first child node
// if (list.hasChildNodes()) {
//     list.removeChild(list.childNodes[0]);
// }

