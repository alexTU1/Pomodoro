let minutes = document.getElementById('mins');
let seconds = document.getElementById('secs');

let minsToWork = 25;
let secsToWork = "00";

window.onload = () => {
    minutes.innerHTML = minsToWork;
    seconds.innerHTML = secsToWork;
}

function play(){
    let mins = 0;
    let secs = 9;

    let timeHandler = () => {
        seconds.innerHTML = secs;
        minutes.innerHTML = mins;
        secs = secs - 1;
        if(secs === 0){
            mins = mins - 1;
            secs = 59;
        }
        if(mins < 0){
            mins = 0;
        }
    }

    setInterval(timeHandler, 1000);
}