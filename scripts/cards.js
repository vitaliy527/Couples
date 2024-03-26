import { gameLogic } from "./gameLogic.js";

function createCard(flippedIcon){
    const cardTemplate = document.querySelector("#cardTemplate").cloneNode(true).content;
    const card = cardTemplate.querySelector(".card");

    card.querySelector("#flippedIcon").classList.add(`fa-${flippedIcon}`);

    // alert(card);
    card.addEventListener('click', () => gameLogic(card));

    return card;
}

function createIconsArray(initialCount){
    const cardsIcons = [
        "compass", "cloud", "play", "bolt", "stop", "cogs", "atom", "basketball-ball", "arrows", "angle-left",
        "bars", "file", "filter", "gear", "folder", "folder-open", "shield", "scissors", "pen-clip"
    ]
   
    let iconsCount = cardsIcons.slice(0, Math.floor(initialCount / 2)); 
    let duobleCards = dublicateElements(iconsCount);

    return shuffleArray(duobleCards);
}

function shuffleArray(array){
    let currentIndex = array.length;

    while(currentIndex !== 0){
        currentIndex--;

        const randomIndex = Math.floor(Math.random() * currentIndex);
        const temp = array[currentIndex];

        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;
    };

    return array;
}

function dublicateElements(array){
    let newArr = [];  // Перебирается массив array и каждый элемент массива (item) дважды вставляется в новый массив

    array.forEach((item) => {
      newArr.push(item, item);
    });

    return newArr;
  }

export { createCard, createIconsArray };