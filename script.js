// CLOCK SET FUNCTION
const HOURS = document.querySelector(".arrow-hours");
const MINUTES = document.querySelector(".arrow-minutes");
const SECONDS = document.querySelector(".arrow-seconds");

function setClock() {
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    
    var minuteDeg = (second <= 59) ? minuteDeg = second / 10 :  minuteDeg = 0;
    var hourDeg = (minute <= 59) ? hourDeg = minute / 2 : hourDeg = 0;
    (hour > 12) ? hour -= 12 : hour;
    
    SECONDS.setAttribute("style",`transform: translate(-50%, 0) rotate(${second * 6}deg)`);
    MINUTES.setAttribute("style",`transform: translate(-50%, 0) rotate(${(minute * 6) + minuteDeg}deg)`);
    HOURS.setAttribute("style",`transform: translate(-50%, 0) rotate(${hour * 30 + hourDeg}deg)`);
};

setClock();
setInterval(setClock, 1000);

// GENERATE LAYOUT FUNCTION
(function generateLayout() {
    const CLOCK = document.querySelector(".clock");

    for (var i = 0; i < 60; i++) {
        let div = document.createElement("div");
        let span = document.createElement("span");

        if (i % 5 === 0) { 
            div.classList.add("line-fat");
            
            span.classList.add("num");
            (i === 0) ? span.innerText = `12` : span.innerText = `${i / 5}`;
            span.setAttribute("style",`transform: translate(-50%, 0) rotate(-${i * 6}deg)`);
            
            div.append(span);
        }
        else {
            div.classList.add("line");
        };

        div.setAttribute("style",`transform: translate(-50%, 0) rotate(${i * 6}deg)`);

        CLOCK.append(div);
    };
})();

// INPUT TOOLTIP
const INFO_ICO = document.querySelector(".input-info");
const TOOL_TIP = document.querySelector(".tooltip");
let alarmTime = document.querySelector("#alarm-time");

INFO_ICO.addEventListener("mouseover", (e) => {
    TOOL_TIP.setAttribute("style","display: block");
});

INFO_ICO.addEventListener("mouseleave", (e) => {
    TOOL_TIP.setAttribute("style","display: none");
});

// SET ALARM FUNCTION
const CLOCK = document.querySelector(".clock");
let setAlarmBtn = document.querySelector(".setalarm");
let removeAlarmBtn = document.querySelector(".remove-alarm");
let alarmInfo = document.querySelector(".alarm-info");
let isSet = false;

function setAlarm() {
    let alarmTimeValue = alarmTime.value.split(":");
    let arrowAlarm = document.createElement("div");
    arrowAlarm.classList.add("arrow-alarm");

    (!alarmTimeValue[1]) ? alarmTimeValue[1] = [-1, -1] : alarmTimeValue;

    var alarmDeg = (alarmTimeValue[1] <= 59) ? alarmDeg = alarmTimeValue[1] / 2 : alarmDeg = 0;
    (alarmTimeValue[0] > 12) ? alarmTimeValue[0] -= 12 : alarmTimeValue[0];

    let stringConvertedAlarmTimeValue = alarmTimeValue.map(el => String(el));
    
    if (Number(stringConvertedAlarmTimeValue[0]) < 10) {
        stringConvertedAlarmTimeValue[0] = `0${stringConvertedAlarmTimeValue[0]}`
    }
    else {
        stringConvertedAlarmTimeValue[0]
    };

    arrowAlarm.setAttribute("style",`transform: translate(-50%, 0) rotate(${(alarmTimeValue[0] * 30) + alarmDeg}deg)`);

    alarmInfo.innerHTML = "";

    let digits = "0123456789".split("");
    
    if (!digits.includes(stringConvertedAlarmTimeValue[0][0]) ||
        !digits.includes(stringConvertedAlarmTimeValue[0][1]) ||
        !digits.includes(stringConvertedAlarmTimeValue[1][0]) ||
        !digits.includes(stringConvertedAlarmTimeValue[1][1]) ||
        alarmTime.value.trim() === "" ||     
        alarmTimeValue[0] > 12 || 
        alarmTimeValue[1] > 59) 
        {
        alarmInfo.innerHTML = "Proszę wpisać poprawną godzinę."
    }
    else {
    CLOCK.append(arrowAlarm);
    alarmTime.value = "";
    isSet = true
    };
};

function removeAlarm() {
    CLOCK.lastChild.remove();
    alarmTime.value = "";
};

setAlarmBtn.addEventListener("click", (e) => {
    e.preventDefault();
    (isSet === true) ? alarmInfo.innerHTML = "Alarm już został ustawiony. Usuń obecny, aby dodać nowy." : setAlarm();
});

removeAlarmBtn.addEventListener("click", (e) => {
    e.preventDefault();
    alarmInfo.innerHTML = "";
    (isSet === false) ? alarmInfo.innerHTML = "Alarm nie został ustawiony.": removeAlarm(); isSet = false
});

// ALARM START/STOP/CHECK FUNCTIONS
const ALARM_FORM = document.querySelector(".alarm");
const ALARM_FORM_COPY = ALARM_FORM.cloneNode(true);
let beepSound = new Audio("beep.mp3");
let isAlarm = false;

function alarmStartCheck() {
    const ALARM_ARROW = document.querySelector(".arrow-alarm");
    if (ALARM_ARROW) {
        if (HOURS.getAttribute("style") === ALARM_ARROW.getAttribute("style") && isAlarm !== true) {
                alarmStart();
                isAlarm = true;
        };
    };
};

setInterval(alarmStartCheck, 1000);

function alarmStart() {
    beepSound.play();
    setInterval(()=> beepSound.play(), 1);
    ALARM_FORM.innerHTML = `<button class="alarm-off">Wyłącz alarm</button>`;
    document.querySelector(".alarm-off").addEventListener("click", alarmOff);
    document.body.classList.add("alarm-animation");
    
}

function alarmOff() {
    beepSound.pause();
    if (document.querySelector(".arrow-alarm")) ALARM_ARROW.remove();
    ALARM_FORM.firstChild.remove();    
    ALARM_FORM.append(ALARM_FORM_COPY);
    document.body.classList.remove("alarm-animation");
}