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
}

setInterval(setClock, 1000);

function generateLayout() {
    const CLOCK = document.querySelector(".clock");

    for (var i = 0; i < 60; i++) {
        let div = document.createElement("div");
        let span = document.createElement("span");

        if (i % 5 === 0) { 
            div.classList.add("line-fat");
            
            span.classList.add("num");
            span.innerText = `${i / 5}`
            span.setAttribute("style",`transform: translate(-50%, 0) rotate(-${i * 6}deg)`)
            
            div.append(span)
        }
        else {
            div.classList.add("line");
        };

        div.setAttribute("style",`transform: translate(-50%, 0) rotate(${i * 6}deg)`)

        CLOCK.append(div)
    }
};

generateLayout();