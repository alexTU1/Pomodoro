const section = document.getElementById('section');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
let titleTimer = document.getElementById('web-title');
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

// Time is set to 25:00 on window load and reload
window.onload = () => {
    minutes.innerHTML = minutesChecker;
    seconds.innerHTML = '0' + secsToWork;
}

// Event listeners for work, break, and long break buttons
wrkBtn.addEventListener('click', () => setTimer(minsToWork, "Get to Work!", wrkBtn));
brkBtn.addEventListener('click', () => setTimer(minsToBreak, "Take a Break!", brkBtn));
longBrkBtn.addEventListener('click', () => setTimer(minsToLongBreak, "Uhh...make a sandwich or something.", longBrkBtn));

/**
 *====================================== Modal ===========================================
 */

// Opens modal box
function openModal(){
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');  
}
// Closes modal box
function closeModal() {  
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}
// Closes modal box when you click anywhere outside of modal
window.onclick = function(event){
    if (event.target == overlay){
        modal.classList.add('hidden');
        overlay.classList.add('hidden');
    }
}

// Animate modal glide in
let settingBtn = document.getElementById('settings');
settingBtn.addEventListener('click', () =>{

    modal.animate(
        { transform: 'translateY(-50%)',
     top: '50%', opacity: '1'}, 
      {
        duration: 350,
        fill: 'both',
        iterations: 1
      });
});

//for some reason this allows for the glide in to work continuously but it does not glide out like I thought it would.
let closeBtn = document.getElementById('close');
let acBtn = document.getElementById('apply-changes');
[closeBtn,acBtn].forEach(btn => 
    btn.addEventListener('click', () =>{

        modal.animate(
            { transform: 'translateY(50%)',
         top: '-30%', opacity: '0'}, 
          {
            duration: 350,
            fill: 'both',
            iterations: 1
          });
    }));

//getting background options
var select = document.getElementById('select');
function getBackground(){
    switch(select.value){
        case 'selectBackground':
            section.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)),url(images/tomas-jasovsky-d5SZqLkpIrY-unsplash.jpg)';
            section.style.backgroundPosition = 'center';
            section.style.backgroundRepeat = 'no-repeat';
            section.style.backgroundSize = 'cover';
            break;
        case 'softFabric': 
            section.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.3)),url(images/engin-akyurt-rFhkipB7sA4-unsplash.jpg)';
            section.style.backgroundPosition = 'center';
            section.style.backgroundRepeat = 'no-repeat';
            section.style.backgroundSize = 'cover';
            break;
        case 'woodGrain': 
            section.style.backgroundImage = 'url(images/joshua-bartell-6vvIBTvL90A-unsplash.jpg)';
            section.style.backgroundPosition = 'center';
            section.style.backgroundRepeat = 'no-repeat';
            section.style.backgroundSize = 'cover';
            break;
        case 'cactus': 
            section.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.2)),url(images/thomas-serer-NX2BUMsqpYY-unsplash.jpg)';
            section.style.backgroundPosition = 'center';
            section.style.backgroundRepeat = 'no-repeat';
            section.style.backgroundSize = 'cover';
            break;
        case 'cafeLights': 
            section.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)),url(images/tomas-jasovsky-d5SZqLkpIrY-unsplash.jpg)';
            section.style.backgroundPosition = 'center';
            section.style.backgroundRepeat = 'no-repeat';
            section.style.backgroundSize = 'cover';
            break;
        case 'comfyDog': 
            section.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.3)),url(images/natalia-gusakova-anUg526qras-unsplash.jpg)';
            section.style.backgroundPosition = 'center';
            section.style.backgroundRepeat = 'no-repeat';
            section.style.backgroundSize = 'cover';
            break; 
        case 'blue': 
            section.style.background = 'blue';
            break;
        case 'green': 
            section.style.background = 'green';
            break;
        case 'cream': 
            section.style.background = 'tan';
            break;   
    } 
}

// Applies changes made in modal settings
function applyChanges(){
    //if user puts nothing or 0 and presses button then timer goes to 25:00
    //parseInt allows for any string numbers to be read as actual integers
    //these expressions return the specified numbers if the value is not a falsy value i.e. (null, " ", 0, Undefined, NaN)
    wTime.value = parseInt(wTime.value) || 25;
    bTime.value = parseInt(bTime.value) || 5;
    lbTime.value = parseInt(lbTime.value) || 15;
    //minutes can now be user specific
    minsToWork = wTime.value < 10 ? '0' + wTime.value : wTime.value;
    minsToBreak = bTime.value < 10 ? '0' + bTime.value : bTime.value;
    minsToLongBreak = lbTime.value < 10 ? '0' + lbTime.value : lbTime.value;
    //sets changes 
    setTimer(minsToLongBreak, "Uhh...make a sandwhich or something.", longBrkBtn);
    setTimer(minsToBreak, "Take a Break!", brkBtn);
    setTimer(minsToWork, "Get to Work!", wrkBtn);
    getBackground();
    closeModal();
    reset();
}

// Reset user settings to original numbers
function resetSettings(){
    wTime.value = 25;
    bTime.value = 5;
    lbTime.value = 15;
    minsToWork = wTime.value < 10 ? '0' + wTime.value : wTime.value;
    minsToBreak = bTime.value < 10 ? '0' + bTime.value : bTime.value;
    minsToLongBreak = lbTime.value < 10 ? '0' + lbTime.value : lbTime.value;
    //sets changes after resetting to original numbers 
    setTimer(minsToLongBreak, "Uhh...make a sandwhich or something.", longBrkBtn);
    setTimer(minsToBreak, "Take a Break!", brkBtn);
    setTimer(minsToWork, "Get to Work!", wrkBtn); 
    select.value = 'selectBackground';
}

// Increase & decrease functions for timer settings
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

/**
 *====================================== Timer ========================================
 */
 let mins = minutesChecker - 1;
let secs = 59;
let interval;
let isReset = false;

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
    //adding timer to website tab once timer is played. Allows user to see timer while on another site
    titleTimer.innerHTML = minutes.innerHTML + ':' + seconds.innerHTML + ' | Do It Diligently';
}
// Start Timer
function playTimer(){
    interval = setInterval(timeHandler, 1000);  
}

// Pause Timer
function pause(){
    clearInterval(interval);
 }

 // Reset Timer
 function reset(){
    window.clearInterval(interval);
    minutes.innerHTML = minutesChecker;
    seconds.innerHTML = '0' + secsToWork;
    mins = minutesChecker - 1;
    secs = 59;
    time = minutesChecker * 60;
    isReset = true;
    titleTimer.innerHTML = 'Do It Diligently'
 }

 // Set timer based on the work/break option
function setTimer(duration, description, activeBtn) {
    minutesChecker = duration;
    displayText.innerHTML = description;
    reset();
    setActiveButton(activeBtn);
}

// Set the active button
function setActiveButton(activeBtn) {
    [wrkBtn, brkBtn, longBrkBtn].forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}
 //======================================== Timer =======================================



 