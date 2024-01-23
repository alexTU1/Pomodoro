/**
 * TODO: Changes do apply once configured in settings but
 * TODO: Corresponding button has to be clicked before changes show on screen 
 * TODO 1) Make sure that changes apply after pressing apply changes button
 */

let minutes = document.getElementById('mins');
let seconds = document.getElementById('secs');
let displayText = document.getElementById('work-break-text');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay')


var minsToWork = 25;
var minsToBreak = 5;
var minsToLongBreak = 15;
var minutesChecker = 25;
//total amount of seconds
let time = minsToWork * 60;
let secsToWork = time % 60;
displayText.innerHTML = "Get to Work!";

/**
 * Modal
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
    if(document.getElementById('w-time').value == 0 || document.getElementById('w-time').value == ''){
        document.getElementById('w-time').value = 25;
    }
    if(document.getElementById('b-time').value == 0 || document.getElementById('b-time').value == ''){
        document.getElementById('b-time').value = 5;
    }
    if(document.getElementById('lb-time').value == 0 || document.getElementById('lb-time').value == ''){
        document.getElementById('lb-time').value = 15;
    }
    //minutes can now be user specific
    minsToWork = document.getElementById('w-time').value;
    minsToBreak = document.getElementById('b-time').value;
    minsToLongBreak = document.getElementById('lb-time').value;
    //closes modal after making changes
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
    reset();
}

let wrk = document.getElementById('work');
let brk = document.getElementById('break');
let longBrk = document.getElementById('long-break');
wrk.onclick = () => {workOrBreak(minsToWork, "Get to Work!");}
brk.onclick = () => {workOrBreak(minsToBreak, "Take a Break!");}
longBrk.onclick = () => {workOrBreak(minsToLongBreak, "Uhh...make a sandwhich or something.");}

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
    minutes.innerHTML = minutesChecker;
    seconds.innerHTML = '0' + secsToWork;
    mins = minutesChecker - 1;
    secs = 59;
    isReset = true;
 }

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