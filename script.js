

var rgbDisplay = document.querySelector("#rgbcolor");
var easyButton = document.querySelector("#easy");
var hardButton = document.querySelector("#hard");
var boxOne = document.querySelector("#box-one");
var boxTwo = document.querySelector("#box-two");
var boxThree = document.querySelector("#box-three");
var boxFour = document.querySelector("#box-four");
var boxFive = document.querySelector("#box-five");
var boxSix = document.querySelector("#box-six");
var newColors = document.querySelector("#new-color");
var header = document.querySelector(".header");
var message = document.querySelector("#message");
var header = document.querySelector(".header");
var easyMode = true;
var currColorSet;
var currSolution;
var gameEnd = false;
reset();
newColors.addEventListener("click", function () {
    reset();
});
easyButton.addEventListener("click", function () {
    if (!easyMode) {
        easyButton.classList.add("selected");
        hardButton.classList.remove("selected");
        easyMode = true;
        reset();
    }
});
hardButton.addEventListener("click", function () {
    if (easyMode) {
        hardButton.classList.add("selected");
        easyButton.classList.remove("selected");
        easyMode = false;
        reset();
    }
});
function randomNumber() {
    return Math.round(Math.random() * 255);
}
function reset() {
    boxOne.style.backgroundColor = getRandomColor();
    boxTwo.style.backgroundColor = getRandomColor();
    boxThree.style.backgroundColor = getRandomColor();
    boxOne.classList.remove("invisible");
    boxTwo.classList.remove("invisible");
    boxThree.classList.remove("invisible");
    if (easyMode) {
        remove(boxFour);
        remove(boxFive);
        remove(boxSix);
    } else {
        add(boxFour);
        add(boxFive);
        add(boxSix);
        boxFour.style.backgroundColor = getRandomColor();
        boxFive.style.backgroundColor = getRandomColor();
        boxSix.style.backgroundColor = getRandomColor();
        boxFour.classList.remove("invisible");
        boxFive.classList.remove("invisible");
        boxSix.classList.remove("invisible");
    }
    message.classList.add("invisible");
    buildColorSet();
    displayQuestion();
    gameEnd = false;
    header.style.backgroundColor = "rgb(78, 78, 203)";
}
function buildColorSet() {
    if (easyMode) {
        currColorSet = [
            boxOne.style.backgroundColor,
            boxTwo.style.backgroundColor,
            boxThree.style.backgroundColor
        ];
    } else {
        currColorSet = [
            boxOne.style.backgroundColor,
            boxTwo.style.backgroundColor,
            boxThree.style.backgroundColor,
            boxFour.style.backgroundColor,
            boxFive.style.backgroundColor,
            boxSix.style.backgroundColor
        ];
    }
}
function displayQuestion() {
    currSolution =
        currColorSet[Math.round(Math.random() * (currColorSet.length - 1))];
    rgbDisplay.textContent = String(currSolution);
}
function getRandomColor() {
    return `RGB( ${randomNumber()}, ${randomNumber()}, ${randomNumber()})`;
}
function remove(elem) {
    elem.classList.add("remove");
}
function add(elem) {
    elem.classList.remove("remove");
}
function check() {
    if (gameEnd) {
        return;
    }
    if (this.style.backgroundColor === currSolution) {
        header.style.backgroundColor = this.style.backgroundColor;
        message.textContent = "You got that one right!";
        message.classList.remove("invisible");
        gameEnd = true;
        // wait for 3 seconds and reset the game
        setTimeout(function () {
            message.textContent = "You got that one right!  .. 3";
        }, 1000);
        setTimeout(function () {
            message.textContent = "You got that one right! .. 2";
        }, 2000);
        setTimeout (function () {
            message.textContent = "You got that one right! .. 1";
        }, 3000);
        setTimeout(function () {
            message.textContent = "You got that one right! .. 0";
        }, 4000);
        setTimeout(function () {
            reset();
        }, 5000);
    } else {
        this.classList.add("invisible");
        message.classList.remove("invisible");
        message.textContent = "Try Again";
    }
}
boxOne.addEventListener("click", check);
boxTwo.addEventListener("click", check);
boxThree.addEventListener("click", check);
boxFour.addEventListener("click", check);
boxFive.addEventListener("click", check);
boxSix.addEventListener("click", check);
