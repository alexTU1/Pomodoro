let minutes = document.getElementById('mins');
let seconds = document.getElementById('secs');

let minsToWork = 25;
//total amount of seconds
let time = minsToWork * 60;
let secsToWork = time%60;

//adding zero placeholder
if(secsToWork < 10) {
    secsToWork = '0' + secsToWork ;
}

//time is set to 25:00 on window load and reload
window.onload = () => {
    minutes.innerHTML = Math.floor(time/60);
    seconds.innerHTML = secsToWork;
}

let mins = minsToWork - 1;
let secs = 59;
let interval;

/**
 * (1) Minutes goes to 24, secs goes to 59
 * (2) Secs value decrease every second
 * (3) Mins value decrease every time secs === 0
 */
function play(){
    let timeHandler = () => {
        seconds.innerHTML = secs;
        minutes.innerHTML = mins;
        secs--;
        if(secs === 0){
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
      interval = setInterval(timeHandler, 1000);  
}

/**
 * Pauses setInterval time
 */
function pause(){
    clearInterval(interval);
 }


