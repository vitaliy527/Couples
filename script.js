const board = document.querySelector("#gameBoard")
const boardButton = document.querySelector(".board__button")
const boardInput = document.querySelector(".board__input")
const templateTable = document.querySelector("#gameTableTemplate");
console.log(templateTable);
const table = templateTable.querySelector(".table");
console.log(table);
const tableButton = templateTable.querySelector(".table__button");
console.log(tableButton);

boardButton.addEventListener("click", (event) =>{
    event.preventDefault();
    let columns = boardInput.value;
    let count;

    if(boardInput.value && boardInput.value % 2 === 0 && boardInput.value < 7 && boardInput.value > 0)
    {
        let panelsCount = boardInput.value**2;
        console.log(panelsCount);
        board.style.display = 'none';
    }else{
        alert("ЕК МАКАРЕК БРАТАН КАК ТАК ТО, ТЫ ВВЕЛ НЕ ЧЕТНОЕ ЧИСЛО(ИЛИ ЧИСЛО БОЛЬШЕ 6 ИЛИ МЕНЬШЕ 2)А НАДО ЛИБО 2, ЛИБО 4,ЛИБО 6 ТЫ ПОНЯЛ????!!!!???");
        return;
    }
    createBoard(columns, count); 
})

function createBoard(columns, counts){
    //event.preventDefault();
    let icons = createIconsArray(counts);
    icons.forEach((icon) =>{
        board.append(createCard(icon));
    });
    board.textContent = "";
    table.style = `
    grid-template-columns: repeat(${columns});
    grid-template-rows: repeat(${columns});`;
    board.append(table);
    board.append(tableButton);
    tableButton.addEventListener("click", ()=> {
        location.reload();
    })
  
    
}
function createCard(flippedIcon){
    const cardTemplate = document.querySelector("#cardTemplate").cloneNode(true).content;
    const card = cardTemplate.querySelector(".card");
    card.querySelector("#flippedIcon").classList.add(`fa-${flippedIcon}`);
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
function dublicateElements(array){
  newArr = [];  // Перебирается массив array и каждый элемент массива (item) дважды вставляется в новый массив
  array.forEach((item) => {
    newArr.push(item, item);
  });
  return newArr;
}
function shuffleArray(array){
    let currentIndex = array.length;
    while(currentIndex !== 0){
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        const temp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;
    }
    return array;
}    
// boardButton.addEventListener('click', createBoard);