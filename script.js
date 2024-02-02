const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
let minutes = document.getElementById('mins');
let seconds = document.getElementById('secs');
let displayText = document.getElementById('work-break-text');
let wTime = document.getElementById('w-time');
let bTime = document.getElementById('b-time');
let lbTime = document.getElementById('lb-time');
let wrkBtn = document.getElementById('work');
let brkBtn = document.getElementById('break');
let longBrkBtn = document.getElementById('long-break');

var minsToWork = 25;
var minsToBreak = '0' + 5;
var minsToLongBreak = 15;
var minutesChecker = 25;
let time = minutesChecker * 60;
let secsToWork = time % 60;
displayText.innerHTML = "Get to Work!";

// Event listeners for work, break, and long break buttons
wrkBtn.addEventListener('click', () => setTimer(minsToWork, "Get to Work!", wrkBtn));
brkBtn.addEventListener('click', () => setTimer(minsToBreak, "Take a Break!", brkBtn));
longBrkBtn.addEventListener('click', () => setTimer(minsToLongBreak, "Uhh...make a sandwich or something.", longBrkBtn));

// Functions for setting the timer based on the work/break option
function setTimer(duration, description, activeBtn) {
    minutesChecker = duration;
    displayText.innerHTML = description;
    reset();
    setActiveButton(activeBtn);
}

// Function to set the active button
function setActiveButton(activeBtn) {
    [wrkBtn, brkBtn, longBrkBtn].forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}

/**
 *====================================== Modal ===========================================
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

//animate modal glide in
let settingBtn = document.getElementById('settings');
settingBtn.addEventListener('click', () =>{

    modal.animate(
        { transform: 'translateY(-50%)',
     top: '50%', opacity: '1'}, 
      {
        duration: 500,
        fill: 'both',
        iterations: 1
      });
});

//for some reason this allows for the glide in to work continuously but it does not glide out like I thought it would.
let closeBtn = document.getElementById('close')
closeBtn.addEventListener('click', () =>{

    modal.animate(
        { transform: 'translateY(50%)',
     top: '-30%', opacity: '0'}, 
      {
        duration: 500,
        fill: 'both',
        iterations: 1
      });
});

let acBtn = document.getElementById('apply-changes')
acBtn.addEventListener('click', () =>{

    modal.animate(
        { transform: 'translateY(50%)',
     top: '-30%', opacity: '0'}, 
      {
        duration: 500,
        fill: 'both',
        iterations: 1
      });
});

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
    //if timer values are less than 10 then another 0 should be added before the minute value
    if(wTime.value < 10){
        minsToWork = '0' + wTime.value;
    }
    if(bTime.value < 10){
        minsToBreak = '0' + bTime.value;
    }
    if(lbTime.value < 10){
        minsToLongBreak = '0' + lbTime.value;
    }
    //sets changes 
    setTimer(minsToLongBreak, "Uhh...make a sandwhich or something.", longBrkBtn);
    setTimer(minsToBreak, "Take a Break!", brkBtn);
    setTimer(minsToWork, "Get to Work!", wrkBtn);
    //temporarily fixes issue where after applying changes the focus on the work/break mode choice is still highlighted but the mode is now changed back to work mode.
    wrkBtn.classList.add('active');
    brkBtn.classList.remove('active');
    longBrkBtn.classList.remove('active');
    closeModal();
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
    setTimer(minsToLongBreak, "Uhh...make a sandwhich or something.", longBrkBtn);
    setTimer(minsToBreak, "Take a Break!", brkBtn);
    setTimer(minsToWork, "Get to Work!", wrkBtn); 
}

//increase & decrease functions for timer settings
function addOneW(){
    wTime.value++;
}
function subOneW(){
    if(wTime.value > 0)
    wTime.value--;
}
function addOneB(){
    bTime.value++;
}
function subOneB(){
    if(bTime.value > 0)
    bTime.value--;
}
function addOneLB(){
    lbTime.value++;
}
function subOneLB(){
    if(lbTime.value > 0)
    lbTime.value--;
}
//========================================== Modal =======================================


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
 *====================================== Timer ========================================
 */

// Countdown Function
let timeHandler = () => {
    seconds.innerHTML = secs;
    minutes.innerHTML = mins;
    if(mins < 10){
        minutes.innerHTML = '0' + mins;
    }
    secs--;
    time--;
    
    if(secs < 0){
        mins = mins - 1;
        secs = 59;
    }
    if(secs < 10) {
        secs = '0' + secs;
    }
    if(mins < 0){
        mins = 0;
    } 
    if(time == 0){
        pause();
    }
}
// Start timer
function playTimer(){
    interval = setInterval(timeHandler, 1000);  
}

// Pause setInterval time
function pause(){
    clearInterval(interval);
 }

 // Resets Timer
 function reset(){
    window.clearInterval(interval);
    minutes.innerHTML = minutesChecker;
    seconds.innerHTML = '0' + secsToWork;
    mins = minutesChecker - 1;
    secs = 59;
    time = minutesChecker * 60;
    isReset = true;
 }
 //======================================== Timer =======================================



 