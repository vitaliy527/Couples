const board = document.querySelector("#gameBoard")
const boardButton = document.querySelector(".board__button")
const boardInput = document.querySelector(".board__input")
const templateTable = document.querySelector("#gameTableTemplate");
console.log(templateTable);
const table = templateTable.querySelector(".table");
console.log(table);
const tableButton = templateTable.querySelector(".table__button");
console.log(tableButton);
let totalTime = 60;
let totalFlips = 0;
let intervalId;

boardButton.addEventListener("click", (event) =>{
    event.preventDefault();
    let columns = boardInput.value;
    let count;

    if(boardInput.value && boardInput.value % 2 === 0 && boardInput.value < 7 && boardInput.value > 1)
    {
        count = boardInput.value ** 2;
        console.log(count);
        board.style.display = 'grid';
         
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
        table.append(createCard(icon));
        // alert(icon);
    });
    board.textContent = "";
    table.style = `
    grid-template-columns: repeat(${columns});
    grid-template-rows: repeat(${columns});`;
    board.append(table);
    console.log(board);
    board.append(tableButton);
    tableButton.addEventListener("click", ()=> {
        location.reload();
    })
  
    
}
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
function gameLogic(card){
    if (totalTime === 0) return;
    // Если обе карточки не кликабельны, ничего не делаем
    if (!couple.firstClickable && !couple.secondClickable) return;

    // Переворачиваем карточку
    card.classList.add('flip');
    totalFlips++;

    // Проверяем, кликнута ли первая карточка
    if (couple.first === null) {
        // Если нет, то сохраняем на нее ссылку и считаем кликнутой
        couple.first = card;
        couple.firstClickable = false;
    } else if (couple.second === null && couple.first !== card) {
        // Если да, то проверяем, кликнута ли вторая карточка и не является ли вторая карточка той же самой карточкой, что и первая, и если нет, то сохраняем ссылку на эту карточку и считаем ее кликнутой
        couple.second = card;
        couple.secondClickable = false;
    }

    // Если какой-либо карточки не кликнуто, ничего не делаем
    if (couple.first === null || couple.second === null) return;

    // Сравниваем классы двух карточек и сохраняем логический результат в переменную (это для повышения читабельности)
    const isEqual = couple.first.firstElementChild.classList[2] === couple.second.firstElementChild.classList[2];

    // Если классы одинаковы
    if (isEqual) {
        setTimeout(() => {
            // То перекрашиваем их в зеленый с задержкой в 1 секунду
            couple.first.classList.add('successfully');
            couple.second.classList.add('successfully');

            // Сбрасываем все ссылки и состояния
            refresh();
        }, 1000);
    } else {
        setTimeout(() => {
            // Иначе переворачиваем карточки обратно с задержкой в 1 секунду
            couple.first.classList.remove('flip');
            couple.second.classList.remove('flip');

            // Сбрасываем все ссылки и состояния
            refresh();
        }, 1000);
    }

    // Функция сброса ссылок и состояний
    function refresh() {
        couple.first = null;
        couple.second = null;
        couple.firstClickable = true;
        couple.secondClickable = true;
    }
    isWin();
}
function isWin() {
    const gameTable = document.querySelector('.table');
    if (totalTime === 0) return;
    if (Array.from(gameTable.children).every((card) => card.classList.contains('flip'))) {
      setTimeout(() => {
        alert("*YEY! U WIN!*");
        clearInterval(intervalId);
      }, 1500)
    }
}
 function startTimer(){
    const stateTime = document.querySelector(".state__time");
    const stateMoves = document.querySelector(".state__moves");

    
    intervalId = setInterval(() => {
        totalTime--;
        stateTime.textContent = `Время: ${totalTime} секунд`;
        stateMoves.textContent = `Шаги: ${totalFlips} шагов`;

        if (totalTime === 0){
            clearInterval(intervalId)
        }
    }, 1000) // функция, которая постоянно выполняет другую функцию с интервалом в 1 секунду
       // останавливает вызов функции с интервалом
    //
} 
   boardButton.addEventListener('click', createBoard);