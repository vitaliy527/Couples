import { totalFlips } from "./gameLogic.js";

let intervalId;
let totalTime = 60;

function startTimer(){
    const stateTime = document.querySelector(".state__time");
    const stateMoves = document.querySelector(".state__moves");

    
    intervalId = setInterval(() => {
        totalTime--;
        stateTime.textContent = `Время: ${totalTime} секунд`;
        stateMoves.textContent = `Шаги: ${totalFlips} шагов`;

        if (totalTime === 0){
            stopTimer();
        }
    }, 1000) // функция, которая постоянно выполняет другую функцию с интервалом в 1 секунду
       // останавливает вызов функции с интервалом
    //
}
function stopTimer(){
    clearInterval(intervalId);
}

export { totalTime, stopTimer, startTimer };