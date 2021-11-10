const numButtons = document.querySelectorAll(".numbers");
const bottomDisplay = document.querySelector("#bottom-display");
const topDisplay = document.querySelector("#top-display");
const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector("#equals");

numButtons.forEach(button => button.addEventListener("click", () => updateDisplay(button.textContent)));
window.addEventListener("keydown", handleKeyboard);
clearButton.addEventListener("click", clearDisplay);
deleteButton.addEventListener("click", deleteLastDisplay);
operatorButtons.forEach(button => button.addEventListener("click", () => handleOperator(button.textContent)));
equalButton.addEventListener("click", getResult);

let lastNumber = "";
let operatorCalled = false;
let currentNumber = "";

function clearDisplay() {
    bottomDisplay.textContent = "0";
    topDisplay.textContent = "";
    operatorCalled = false;
    lastNumber = "";
    currentNumber = "";
}

function handleKeyboard(e) {
    if ((e.key >= 0 && e.key <= 9) || e.key === '.') {
        updateDisplay(e.key);
    }
    else if (e.key === "Backspace") {
        deleteLastDisplay();
    }
    else if (e.key === "Escape") {
        clearDisplay();
    }
    else if (e.key === "Enter") {
        e.preventDefault();
        getResult();
    }
    else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        handleOperator(e.key);
    }
}

function updateDisplay(number) {
    let currentTextContent = bottomDisplay.textContent;
    if ((number === '.' && currentTextContent.includes(".")) || currentTextContent === "ERROR") {
        return;
    }
    if (currentTextContent === "0" || operatorCalled) {
        bottomDisplay.textContent = number;
        operatorCalled = false;
    }
    else if (currentTextContent.length === 25) {
        return;
    }
    else {
        bottomDisplay.textContent += number;
    }
}

function deleteLastDisplay() {
    let currentTextContent = bottomDisplay.textContent;
    if (currentTextContent.length === 1 || currentTextContent === "ERROR") {
        clearDisplay();
    }
    else {
        bottomDisplay.textContent = currentTextContent.slice(0, -1);
    }
}

function getResult() {
    currentNumber = bottomDisplay.textContent;
    if (currentNumber !== "" && lastNumber !== "" && !operatorCalled) {
        topDisplayContent = topDisplay.textContent;
        let operator = topDisplayContent.slice(topDisplayContent.length - 1);
        if (operator === '+' || operator === '-' || operator === '×' || operator === '÷') {
            let result = operate(lastNumber, currentNumber, operator)
            bottomDisplay.textContent = result;
            topDisplay.textContent = topDisplayContent + " " + currentNumber + " = " + result;
        }
        else {
            return;
        }
    }

}

function handleOperator(operator) {
    if (operator === '/') {
        operator = '÷';
    }
    if (operator === '*') {
        operator = '×';
    }
    topDisplayContent = topDisplay.textContent;
    topDisplayContentLastChar = topDisplayContent.slice(topDisplayContent.length - 1);
    if (topDisplayContentLastChar === '+' || topDisplayContentLastChar === '-' || topDisplayContentLastChar === '×' || topDisplayContentLastChar === '÷') {
        if (operatorCalled) {
            topDisplay.textContent = topDisplayContent.slice(0, -1) + operator;
            return;
        }
        let currentNumber = bottomDisplay.textContent;
        lastNumber = operate(lastNumber, currentNumber, topDisplayContentLastChar);
        bottomDisplay.textContent = lastNumber;
    }
    else {
        lastNumber = bottomDisplay.textContent;
    }
    if (lastNumber === "ERROR") {
        return;
    }
    topDisplay.textContent = lastNumber + " " + operator;
    operatorCalled = true;
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "ERROR";
    }
    return a / b;
}

function operate(a, b, operator) {
    a = Number(a)
    b = Number(b)
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '×':
            return multiply(a, b);
        case '÷':
            return divide(a, b);
    }
}
