let minutes = document.getElementById('mins');
let seconds = document.getElementById('secs');
let displayText = document.getElementById('work-break-text');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
let wTime = document.getElementById('w-time');
let bTime = document.getElementById('b-time');
let lbTime = document.getElementById('lb-time');

var minsToWork = 25;
var minsToBreak = 5;
var minsToLongBreak = 15;
var minutesChecker = 25;
//total amount of seconds
let time = minutesChecker * 60;
let secsToWork = time % 60;
displayText.innerHTML = "Get to Work!";

/**
 * Modal =================================================================================
 */

//opens modal box
function openModal(){
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}
//closes modal box
function closeModal() {  
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}
//closes modal box when you click anywhere outside of modal
window.onclick = function(event){
if (event.target == overlay){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}
}

//applies changes made in modal settings
function applyChanges(){
    //if user puts nothing and presses button then timer goes to 25:00
    if(wTime.value == 0 || wTime.value == ''){
        wTime.value = 25;
    }
    if(bTime.value == 0 || bTime.value == ''){
        bTime.value = 5;
    }
    if(lbTime.value == 0 || lbTime.value == ''){
        lbTime.value = 15;
    }
    //minutes can now be user specific
    minsToWork = wTime.value;
    minsToBreak = bTime.value;
    minsToLongBreak = lbTime.value;
    //sets changes 
    workOrBreak(minsToLongBreak, "Uhh...make a sandwhich or something.");
    workOrBreak(minsToBreak, "Take a Break!");
    workOrBreak(minsToWork, "Get to Work!");
    //closes modal after making changes
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
    console.log(time);
    reset();
}

//reset user settings to original numbers
function resetSettings(){
    wTime.value = 25;
    bTime.value = 5;
    lbTime.value = 15;
    minsToWork = wTime.value;
    minsToBreak = bTime.value;
    minsToLongBreak = lbTime.value;
    //sets changes after resetting to original numbers 
    workOrBreak(minsToLongBreak, "Uhh...make a sandwhich or something.");
    workOrBreak(minsToBreak, "Take a Break!");
    workOrBreak(minsToWork, "Get to Work!"); 
}
// ================================================================================= Modal

let wrkBtn = document.getElementById('work');
let brkBtn = document.getElementById('break');
let longBrkBtn = document.getElementById('long-break');
wrkBtn.onclick = () => {workOrBreak(minsToWork, "Get to Work!");}
brkBtn.onclick = () => {workOrBreak(minsToBreak, "Take a Break!");}
longBrkBtn.onclick = () => {workOrBreak(minsToLongBreak, "Uhh...make a sandwhich or something.");}

//time is set to 25:00 on window load and reload
window.onload = () => {
    minutes.innerHTML = minutesChecker;
    seconds.innerHTML = '0' + secsToWork;
}

let mins = minutesChecker - 1;
let secs = 59;
let interval;
let isReset = false;


/**
 * Timer =========================================================================
 */

/**
 * Countdown Function
 */
let timeHandler = () => {
    seconds.innerHTML = secs;
    minutes.innerHTML = mins;
    secs--;
    time--;
    
    if(secs < 0){
        mins = mins - 1;
        secs = 59;
    }
    if(secs < 10) {
        secs = '0' + secs ;
    }
    if(mins < 0){
        mins = 0;
    } 
    if(time == 0){
        pause();
    }
}

/**
 * Start timer
 */
function play(){
    interval = setInterval(timeHandler, 1000);  
}

/**
 * Pauses setInterval time
 */
function pause(){
    clearInterval(interval);
 }

 /**
  * Resets timer to time according to specified 
  * timer option 'work, break, long break'
  */
 function reset(){
    window.clearInterval(interval);
    minutes.innerHTML = minutesChecker;
    seconds.innerHTML = '0' + secsToWork;
    mins = minutesChecker - 1;
    secs = 59;
    time = minutesChecker * 60;
    isReset = true;
 }
 // ========================================================================= Timer

 /**
  * 
  * @param {*} workOrBreakMins How many minutes for each work/break option
  * @param {*} descriptText text for each work/break option
  */
 function workOrBreak(workOrBreakMins, descriptText){
    minutesChecker = workOrBreakMins;
    displayText.innerHTML = descriptText;
    reset();
 }

 