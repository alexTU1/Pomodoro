let minutes = document.getElementById('mins');
let seconds = document.getElementById('secs');
let displayText = document.getElementById('work-break-text');

let minsToWork = 25;
//total amount of seconds
let time = minsToWork * 60;
let secsToWork = time % 60;
displayText.innerHTML = "Get to Work!";

//time is set to 25:00 on window load and reload
window.onload = () => {
    minutes.innerHTML = Math.floor(time / 60);
    seconds.innerHTML = '0' + secsToWork;
}

let mins = minsToWork - 1;
let secs = 59;
let interval;
let isReset = false;

/**
 * Countdown Function
 */
let timeHandler = () => {
    seconds.innerHTML = secs;
    minutes.innerHTML = mins;
    secs--;
    
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
    minutes.innerHTML = minsToWork;
    seconds.innerHTML = '0' + secsToWork;
    mins = minsToWork - 1;
    secs = 59;
    isReset = true;
 }

 /**
  * 
  * @param {*} workOrBreakMins How many minutes for each work/break option
  * @param {*} descriptText text for each work/break option
  */
 function workOrBreak(workOrBreakMins, descriptText){
    minsToWork = workOrBreakMins;
    displayText.innerHTML = descriptText;
    reset();
 }
 









