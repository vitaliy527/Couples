import { createBoard } from "./scripts/createBoard.js";

const boardButton = document.querySelector(".board__button");
boardButton.addEventListener("click", (event) =>{
    event.preventDefault();
    const boardInput = document.querySelector(".board__input")
    let columns = boardInput.value;
    let count;
    
    if(columns && columns % 2 === 0 && columns < 7 && columns > 1)
    {
        count = columns ** 2;
         
    }else{
        alert("ЕК МАКАРЕК БРАТАН КАК ТАК ТО, ТЫ ВВЕЛ НЕ ЧЕТНОЕ ЧИСЛО(ИЛИ ЧИСЛО БОЛЬШЕ 6 ИЛИ МЕНЬШЕ 2)А НАДО ЛИБО 2, ЛИБО 4,ЛИБО 6 ТЫ ПОНЯЛ????!!!!???");
        return;
    }
    createBoard(columns, count);
});
