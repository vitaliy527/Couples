import { startTimer } from "./timer.js";
import { createCard, createIconsArray } from "./cards.js";

export function createBoard(columns, counts){
    //event.preventDefault();
    const board = document.querySelector(".board");
    const templateTable = document.querySelector("#gameTableTemplate").cloneNode(true).content;
    const gameTable = templateTable.querySelector(".table");
    const restartButton = templateTable.querySelector(".table__button");

    board.textContent = "";
    let icons = createIconsArray(counts);
    
    icons.forEach((icon) =>{
        gameTable.append(createCard(icon));
        // alert(icon);
        console.log(gameTable, icons);
    });

    //board.textContent = "";

    gameTable.style = `
    grid-template-columns: repeat(${columns}, 1fr);
    grid-template-rows: repeat(${columns}, 1fr );
    `;

    board.append(gameTable);
    //console.log(board);
    restartButton.addEventListener("click", ()=> {
        location.reload();
    });
    board.append(restartButton);
    startTimer();
}

